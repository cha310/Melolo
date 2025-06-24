import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execPromise = promisify(exec)

// Simple in-memory cache for video info (expires after 10 minutes)
const videoInfoCache = new Map<string, { data: any, timestamp: number }>()
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

export async function POST(request: Request) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ message: "YouTube URL is required" }, { status: 400 })
    }

    // Validate URL (basic check)
    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      return NextResponse.json({ message: "Invalid YouTube URL" }, { status: 400 })
    }

    // Check cache first
    const cacheKey = url
    const cachedData = videoInfoCache.get(cacheKey)
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_DURATION) {
      console.log("Returning cached video info")
      return NextResponse.json(cachedData.data)
    }

    // Check if yt-dlp is available with multiple possible paths
    let ytDlpPath = 'yt-dlp'
    try {
      // Try to find yt-dlp in the system
      const { stdout } = await execPromise("which yt-dlp")
      ytDlpPath = stdout.trim()
      console.log(`Found yt-dlp at: ${ytDlpPath}`)
    } catch (error) {
      console.log("yt-dlp not found in PATH, trying common paths...")
      // Try common installation paths
      const commonPaths = [
        '/usr/local/bin/yt-dlp',
        '/opt/homebrew/bin/yt-dlp', 
        '/usr/bin/yt-dlp',
        'yt-dlp'
      ]
      
      let found = false
      for (const path of commonPaths) {
        try {
          await execPromise(`${path} --version`)
          ytDlpPath = path
          found = true
          console.log(`Found yt-dlp at: ${path}`)
          break
        } catch (e) {
          console.log(`yt-dlp not found at: ${path}`)
          continue
        }
      }
      
      if (!found) {
        console.error("yt-dlp not found in any common paths:", error)
        return NextResponse.json({ 
          message: "Video download service is currently unavailable. Please try again later." 
        }, { status: 503 })
      }
    }

    // Get video info using yt-dlp with optimization flags
    // Only get essential info for faster processing
    const command = `${ytDlpPath} --dump-json --no-playlist --skip-download --no-warnings --quiet --no-check-certificate --socket-timeout 10 --no-call-home --no-cache-dir --ignore-errors "${url}"`

    const { stdout, stderr } = await execPromise(command, { timeout: 15000 }) // 15 seconds timeout

    if (stderr && !stdout) {
      console.error("Error executing yt-dlp:", stderr)
      return NextResponse.json({ 
        message: "Failed to fetch video information. Please check if the URL is valid and the video is accessible." 
      }, { status: 400 })
    }

    let videoData
    try {
      videoData = JSON.parse(stdout)
    } catch (parseError) {
      console.error("Error parsing yt-dlp output:", parseError)
      return NextResponse.json({ 
        message: "Failed to process video information. Please try again." 
      }, { status: 500 })
    }

    // Extract relevant information and build dynamic formats
    const availableFormats = []
    
    // Get the actual formats from yt-dlp data
    const formats = videoData.formats || []
    
    // Define a type for format objects
    interface YtDlpFormat {
      format_id: string
      ext: string
      height?: number
      vcodec?: string
      acodec?: string
      filesize?: number
    }
    
    // Find the best available formats for common resolutions
    const findBestFormat = (height: number, includeAudio = false) => {
      return formats.find((f: YtDlpFormat) => 
        f.height === height && 
        f.vcodec !== 'none' && 
        (includeAudio ? f.acodec !== 'none' : true) &&
        f.ext === 'mp4'
      )
    }

    // Try to find formats with both video and audio (combined formats)
    const combinedFormats = formats.filter((f: YtDlpFormat) => 
      f.vcodec !== 'none' && 
      f.acodec !== 'none' && 
      f.ext === 'mp4' &&
      f.height
    )

    // Sort by height descending to get best quality first
    combinedFormats.sort((a: YtDlpFormat, b: YtDlpFormat) => (b.height || 0) - (a.height || 0))

    // Add the best combined formats
    const addedQualities = new Set()
    
    for (const format of combinedFormats) {
      const height = format.height
      let quality = ''
      
      if (height >= 1080) quality = '1080p'
      else if (height >= 720) quality = '720p'
      else if (height >= 480) quality = '480p'
      else if (height >= 360) quality = '360p'
      else if (height >= 240) quality = '240p'
      else quality = `${height}p`
      
      if (!addedQualities.has(quality) && quality !== '') {
        const sizeStr = format.filesize ? 
          `~${Math.round(format.filesize / 1024 / 1024)}MB` : 
          '~Unknown'
          
        availableFormats.push({
          quality,
          format: 'mp4',
          size: sizeStr,
          url: `/api/download?url=${encodeURIComponent(url)}&format=${format.format_id}`,
        })
        addedQualities.add(quality)
        
        // Limit to 4 video formats to avoid overwhelming the user
        if (availableFormats.length >= 4) break
      }
    }

    // Add audio-only format
    const audioFormat = formats.find((f: YtDlpFormat) => 
      f.acodec !== 'none' && 
      f.vcodec === 'none' && 
      (f.ext === 'm4a' || f.ext === 'mp3' || f.ext === 'webm')
    )
    
    if (audioFormat) {
      const sizeStr = audioFormat.filesize ? 
        `~${Math.round(audioFormat.filesize / 1024 / 1024)}MB` : 
        '~5MB'
        
      availableFormats.push({
        quality: "Audio Only",
        format: "mp3",
        size: sizeStr,
        url: `/api/download?url=${encodeURIComponent(url)}&format=${audioFormat.format_id}&audio=true`,
      })
    }

    // Fallback: if no formats found, add some basic ones that usually work
    if (availableFormats.length === 0) {
      availableFormats.push(
        {
          quality: "Best Quality",
          format: "mp4",
          size: "~Unknown",
          url: `/api/download?url=${encodeURIComponent(url)}&format=best`,
        },
        {
          quality: "Audio Only",
          format: "mp3",
          size: "~5MB",
          url: `/api/download?url=${encodeURIComponent(url)}&format=bestaudio&audio=true`,
        }
      )
    }

    const videoInfo = {
      title: videoData.title || "Unknown Title",
      thumbnail: videoData.thumbnail || videoData.thumbnails?.[0]?.url || "/placeholder.svg",
      duration: videoData.duration || 0,
      formats: availableFormats,
    }

    // Cache the result
    videoInfoCache.set(cacheKey, {
      data: videoInfo,
      timestamp: Date.now()
    })

    // Clean up old cache entries (keep cache size manageable)
    if (videoInfoCache.size > 100) {
      const oldestKey = videoInfoCache.keys().next().value
      if (oldestKey) {
        videoInfoCache.delete(oldestKey)
      }
    }

    return NextResponse.json(videoInfo)
  } catch (error) {
    console.error("Error processing request:", error)
    
    // More specific error handling
    if (error instanceof SyntaxError) {
      return NextResponse.json({ 
        message: "Invalid request format. Please check your input." 
      }, { status: 400 })
    }
    
    return NextResponse.json({ 
      message: "An unexpected error occurred. Please try again later." 
    }, { status: 500 })
  }
}
