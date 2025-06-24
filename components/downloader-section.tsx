"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Download, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VideoInfo {
  title: string
  thumbnail: string
  formats: {
    quality: string
    format: string
    size: string
    url: string
  }[]
}

export function DownloaderSection() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim()) {
      setError("请输入 YouTube 视频链接")
      return
    }

    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      setError("请输入有效的 YouTube 视频链接")
      return
    }

    setLoading(true)
    setError("")
    setVideoInfo(null)

    try {
      const response = await fetch("/api/video-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "获取视频信息失败")
      }

      setVideoInfo(data)
    } catch (err) {
      let errorMessage = "发生未知错误，请稍后重试"
      
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      }
      
      // 处理网络错误
      if (errorMessage.includes('Failed to fetch')) {
        errorMessage = "网络连接失败，请检查网络连接后重试"
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (downloadUrl: string) => {
    try {
      const response = await fetch(downloadUrl)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "下载失败")
      }
      
      // 检查响应是否为文件
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json()
        throw new Error(errorData.message || "下载失败")
      }
      
      window.open(downloadUrl, "_blank")
    } catch (err) {
      let errorMessage = "下载失败，请稍后重试"
      
      if (err instanceof Error) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
    }
  }

  return (
    <section id="downloader-section" className="py-0 px-4 bg-white">
      <div className="container mx-auto max-w-10xl px-8">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex items-center gap-0 bg-white rounded-xl shadow-lg border border-gray-200 p-4 w-full max-w-7xl mx-auto">
            {/* YouTube Icon */}
            <div className="flex-shrink-0 pl-6 pr-4">
              <Image
                src="/icons/YouTube.svg"
                alt="YouTube"
                width={64}
                height={64}
                className="w-12 h-12"
              />
            </div>
            
            {/* Input Field */}
            <Input
              type="text"
              placeholder="Input your Youtube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-xl px-4 py-4 text-gray-600 placeholder:text-gray-400"
            />
            
            {/* Download Button */}
            <Button
              type="submit"
              className="text-white px-12 py-6 text-xl rounded-lg font-medium shadow-lg flex-shrink-0"
              style={{ backgroundColor: '#6122f2' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-5 h-8 w-8 animate-spin" />
                  Processing...
                </>
              ) : (
                "Download"
              )}
            </Button>
          </div>
        </form>

        {/* Features Section */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-600 font-medium">Free and Unlimited</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-600 font-medium">No Signup Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-600 font-medium">Fast Conversion</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-600 font-medium">No Ads</span>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {videoInfo && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              <div className="md:w-1/3">
                <img
                  src={videoInfo.thumbnail || "/placeholder.svg"}
                  alt={videoInfo.title}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-semibold mb-2">{videoInfo.title}</h3>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Available Downloads:</h4>
                  <div className="space-y-3">
                    {videoInfo.formats.map((format, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                        <div>
                          <span className="font-medium">{format.quality}</span>
                          <span className="text-sm text-gray-500 ml-2">({format.format})</span>
                          <span className="text-sm text-gray-500 ml-2">{format.size}</span>
                        </div>
                        <Button
                          onClick={() => handleDownload(format.url)}
                          className="text-white"
                          style={{ backgroundColor: '#6122f2' }}
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
