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

    // Create a temporary directory for downloads if it doesn't exist
    const tempDir = path.join(process.cwd(), "temp")
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir)
    }

    // Generate a unique filename
    const uniqueId = uuidv4()
    const outputPath = path.join(tempDir, `${uniqueId}`)

    // Prepare the yt-dlp command
    let command

    if (isAudio) {
      // For audio-only downloads
      command = `yt-dlp -f ${format} -x --audio-format mp3 -o "${outputPath}.%(ext)s" "${youtubeUrl}"`
    } else {
      // For video downloads
      command = `yt-dlp -f ${format} -o "${outputPath}.%(ext)s" "${youtubeUrl}"`
    }

    // Execute the command
    await execPromise(command)

    // Find the downloaded file
    const files = fs.readdirSync(tempDir)
    const downloadedFile = files.find((file) => file.startsWith(uniqueId))

    if (!downloadedFile) {
      return NextResponse.json({ message: "Failed to download the file" }, { status: 500 })
    }

    const filePath = path.join(tempDir, downloadedFile)
    const fileContent = fs.readFileSync(filePath)

    // Get the file extension
    const fileExt = path.extname(downloadedFile).substring(1)

    // Prepare the response
    const response = new NextResponse(fileContent)

    // Set appropriate headers
    response.headers.set("Content-Disposition", `attachment; filename="melolo_download.${fileExt}"`)
    response.headers.set("Content-Type", isAudio ? "audio/mpeg" : "video/mp4")

    // Clean up the file after sending
    fs.unlinkSync(filePath)

    return response
  } catch (error) {
    console.error("Error processing download:", error)
    return NextResponse.json({ message: "An unexpected error occurred during download" }, { status: 500 })
  }
}
