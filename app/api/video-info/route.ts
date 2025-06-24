import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execPromise = promisify(exec)

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

    // Check if yt-dlp is available
    try {
      await execPromise("which yt-dlp")
    } catch (error) {
      console.error("yt-dlp not found:", error)
      return NextResponse.json({ 
        message: "Video download service is currently unavailable. Please try again later." 
      }, { status: 503 })
    }

    // Get video info using yt-dlp
    const command = `yt-dlp --dump-json --no-playlist "${url}"`

    const { stdout, stderr } = await execPromise(command)

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

    // Extract relevant information
    const videoInfo = {
      title: videoData.title || "Unknown Title",
      thumbnail: videoData.thumbnail || videoData.thumbnails?.[0]?.url || "/placeholder.svg",
      duration: videoData.duration || 0,
      formats: [
        {
          quality: "720p",
          format: "mp4",
          size: "~20MB",
          url: `/api/download?url=${encodeURIComponent(url)}&format=22`,
        },
        {
          quality: "480p", 
          format: "mp4",
          size: "~12MB",
          url: `/api/download?url=${encodeURIComponent(url)}&format=18`,
        },
        {
          quality: "360p",
          format: "mp4", 
          size: "~8MB",
          url: `/api/download?url=${encodeURIComponent(url)}&format=134`,
        },
        {
          quality: "Audio Only",
          format: "mp3",
          size: "~5MB",
          url: `/api/download?url=${encodeURIComponent(url)}&format=140&audio=true`,
        },
      ],
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
