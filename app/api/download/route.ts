import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

const execPromise = promisify(exec)

export async function GET(request: Request) {
  try {
    // Get URL parameters
    const { searchParams } = new URL(request.url)
    const youtubeUrl = searchParams.get("url")
    const format = searchParams.get("format")
    const isAudio = searchParams.get("audio") === "true"

    if (!youtubeUrl) {
      return NextResponse.json({ message: "YouTube URL is required" }, { status: 400 })
    }

    // Validate URL
    if (!youtubeUrl.includes("youtube.com/") && !youtubeUrl.includes("youtu.be/")) {
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

    // Create a temporary directory for downloads if it doesn't exist
    const tempDir = path.join(process.cwd(), "temp")
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
    }

    // Generate a unique filename
    const uniqueId = uuidv4()
    const outputPath = path.join(tempDir, `${uniqueId}`)

    // Prepare the yt-dlp command
    let command

    if (isAudio) {
      // For audio-only downloads (download original format without conversion)
      command = `yt-dlp -f ${format} -o "${outputPath}.%(ext)s" "${youtubeUrl}"`
    } else {
      // For video downloads
      command = `yt-dlp -f ${format} -o "${outputPath}.%(ext)s" "${youtubeUrl}"`
    }

    // Execute the command with timeout
    const { stdout, stderr } = await execPromise(command, { timeout: 300000 }) // 5 minute timeout

    if (stderr && !stdout) {
      console.error("yt-dlp error:", stderr)
      return NextResponse.json({ 
        message: "Failed to download the video. The video may be private, unavailable, or the format is not supported." 
      }, { status: 400 })
    }

    // Find the downloaded file
    const files = fs.readdirSync(tempDir)
    const downloadedFile = files.find((file) => file.startsWith(uniqueId))

    if (!downloadedFile) {
      return NextResponse.json({ 
        message: "Download completed but file not found. Please try again." 
      }, { status: 500 })
    }

    const filePath = path.join(tempDir, downloadedFile)
    
    // Check if file exists and is readable
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ 
        message: "Downloaded file not accessible. Please try again." 
      }, { status: 500 })
    }

    const fileContent = fs.readFileSync(filePath)

    // Get the file extension
    const fileExt = path.extname(downloadedFile).substring(1)

    // Clean up the file
    try {
      fs.unlinkSync(filePath)
    } catch (cleanupError) {
      console.warn("Failed to cleanup temporary file:", cleanupError)
    }

    // Prepare the response
    const response = new NextResponse(fileContent)

    // Set appropriate headers based on file extension
    let contentType = "application/octet-stream" // default
    if (isAudio) {
      if (fileExt === 'mp3') contentType = "audio/mpeg"
      else if (fileExt === 'webm') contentType = "audio/webm"
      else if (fileExt === 'm4a') contentType = "audio/mp4"
    } else {
      if (fileExt === 'mp4') contentType = "video/mp4"
      else if (fileExt === 'webm') contentType = "video/webm"
    }
    const fileName = `melolo_download.${fileExt}`
    
    response.headers.set("Content-Disposition", `attachment; filename="${fileName}"`)
    response.headers.set("Content-Type", contentType)
    response.headers.set("Content-Length", fileContent.length.toString())

    return response
  } catch (error) {
    console.error("Error processing download:", error)
    
    // Handle specific error types
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ETIMEDOUT') {
      return NextResponse.json({ 
        message: "Download timeout. The video may be too large or network is slow. Please try again." 
      }, { status: 408 })
    }
    
    if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('ENOSPC')) {
      return NextResponse.json({ 
        message: "Server storage full. Please try again later." 
      }, { status: 507 })
    }
    
    return NextResponse.json({ 
      message: "An unexpected error occurred during download. Please try again later." 
    }, { status: 500 })
  }
}
