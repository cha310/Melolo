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

    // Get video info using yt-dlp
    // Note: yt-dlp must be installed on the server
    const command = `yt-dlp --dump-json --no-playlist "${url}"`

    const { stdout, stderr } = await execPromise(command)

    if (stderr) {
      console.error("Error executing yt-dlp:", stderr)
      return NextResponse.json({ message: "Failed to fetch video information" }, { status: 500 })
    }

    const videoData = JSON.parse(stdout)

    // Extract relevant information
    const videoInfo = {
      title: videoData.title,
      thumbnail: videoData.thumbnail,
      formats: [
        {
          quality: "720p",
          format: "mp4",
          size: "~20MB", // This would be calculated dynamically in a real implementation
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
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 })
  }
}
