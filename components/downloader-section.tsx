"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Download, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

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

interface DownloadState {
  isDownloading: boolean
  progress: number
  status: 'idle' | 'preparing' | 'downloading' | 'completed' | 'error' | 'cancelled'
  downloadSpeed?: string
  fileSize?: string
  estimatedTime?: string
  bytesLoaded?: number
  bytesTotal?: number
  xhr?: XMLHttpRequest // 存储XHR实例以便取消
}

export function DownloaderSection() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [downloadStates, setDownloadStates] = useState<Record<number, DownloadState>>({})
  
  // 格式化字节大小的辅助函数
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

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
    setDownloadStates({}) // 重置下载状态

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

  const updateDownloadState = (index: number, state: Partial<DownloadState>) => {
    console.log(`Updating download state for index ${index}:`, state)
    setDownloadStates(prev => {
      const newState = {
        ...prev,
        [index]: { ...prev[index], ...state }
      }
      console.log(`New download states:`, newState)
      return newState
    })
  }

  const cancelDownload = (formatIndex: number) => {
    const downloadState = downloadStates[formatIndex]
    if (downloadState?.xhr) {
      downloadState.xhr.abort()
      updateDownloadState(formatIndex, {
        isDownloading: false,
        progress: 0,
        status: 'cancelled',
        xhr: undefined
      })
      
      // 3秒后重置状态
      setTimeout(() => {
        updateDownloadState(formatIndex, {
          status: 'idle'
        })
      }, 3000)
    }
  }

  const handleDownload = async (downloadUrl: string, formatIndex: number) => {
    try {
      // 创建XMLHttpRequest
      const xhr = new XMLHttpRequest()
      
      // 初始化下载状态
      updateDownloadState(formatIndex, {
        isDownloading: true,
        progress: 0,
        status: 'preparing',
        xhr: xhr
      })
      
      // 设置响应类型为blob
      xhr.responseType = 'blob'
      
      // 用于计算下载速度的变量
      let startTime = Date.now()
      let lastTime = startTime
      let lastLoaded = 0
      
      // 格式化文件大小
      const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
      }
      
      // 格式化时间
      const formatTime = (seconds: number): string => {
        if (seconds < 60) return `${Math.round(seconds)}秒`
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.round(seconds % 60)
        return `${minutes}分${remainingSeconds}秒`
      }
      
      // 立即显示初始进度并开始准备阶段模拟
      let currentProgress = 5 // 从5%开始，更明显
      updateDownloadState(formatIndex, {
        progress: currentProgress,
        status: 'preparing'
      })
      
      console.log(`Starting download for format ${formatIndex}, initial progress: ${currentProgress}%`)
      
      // 监听下载进度
      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          // 将真实下载进度映射到20-100%范围
          const rawProgress = (event.loaded / event.total) * 100
          const progress = Math.round(20 + (rawProgress * 0.8)) // 20% + 80% * 真实进度
          const currentTime = Date.now()
          const timeDiff = (currentTime - lastTime) / 1000 // 秒
          const bytesDiff = event.loaded - lastLoaded
          
          // 计算下载速度 (每秒更新一次)
          let downloadSpeed = ''
          let estimatedTime = ''
          
          if (timeDiff > 1) { // 每秒更新一次速度
            const speed = bytesDiff / timeDiff // bytes per second
            downloadSpeed = formatFileSize(speed) + '/s'
            
            // 计算剩余时间
            const remainingBytes = event.total - event.loaded
            const remainingSeconds = remainingBytes / speed
            estimatedTime = formatTime(remainingSeconds)
            
            lastTime = currentTime
            lastLoaded = event.loaded
          }
          
          updateDownloadState(formatIndex, {
            progress,
            status: 'downloading',
            bytesLoaded: event.loaded,
            bytesTotal: event.total,
            fileSize: formatFileSize(event.total),
            downloadSpeed: downloadSpeed || undefined,
            estimatedTime: estimatedTime || undefined
          })
        }
      }
      
      // 监听下载完成
      xhr.onload = () => {
        if (xhr.status === 200) {
          // 下载完成，创建Blob URL并触发下载
          const blob = xhr.response
          const url = window.URL.createObjectURL(blob)
          
          // 从响应头获取文件名，或使用默认名称
          const contentDisposition = xhr.getResponseHeader('Content-Disposition')
          let filename = 'melolo_download'
          
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, '')
            }
          }
          
          // 创建下载链接
          const link = document.createElement('a')
          link.href = url
          link.download = filename
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          
          // 清理资源
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
          
          // 更新状态为完成
          updateDownloadState(formatIndex, {
            progress: 100,
            status: 'completed',
            isDownloading: false,
            xhr: undefined
          })
          
          // 3秒后重置状态
          setTimeout(() => {
            updateDownloadState(formatIndex, {
              progress: 0,
              status: 'idle',
              isDownloading: false
            })
          }, 3000)
        } else {
          throw new Error(`HTTP ${xhr.status}: ${xhr.statusText}`)
        }
      }
      
      // 监听错误
      xhr.onerror = () => {
        clearPreparingInterval()
        updateDownloadState(formatIndex, {
          progress: 0,
          status: 'error',
          isDownloading: false,
          xhr: undefined
        })
        setError("网络错误，下载失败")
        
        // 3秒后重置错误状态
        setTimeout(() => {
          updateDownloadState(formatIndex, {
            status: 'idle'
          })
        }, 3000)
      }
      
      // 监听取消/中断
      xhr.onabort = () => {
        clearPreparingInterval()
        updateDownloadState(formatIndex, {
          progress: 0,
          status: 'cancelled',
          isDownloading: false,
          xhr: undefined
        })
        
        // 3秒后重置状态
        setTimeout(() => {
          updateDownloadState(formatIndex, {
            status: 'idle'
          })
        }, 3000)
      }
      
      // 监听超时
      xhr.ontimeout = () => {
        clearPreparingInterval()
        updateDownloadState(formatIndex, {
          progress: 0,
          status: 'error',
          isDownloading: false
        })
        setError("下载超时，请检查网络连接")
        
        // 3秒后重置错误状态
        setTimeout(() => {
          updateDownloadState(formatIndex, {
            status: 'idle'
          })
        }, 3000)
      }
      
      // 设置超时时间（10分钟）
      xhr.timeout = 10 * 60 * 1000
      

      
      // 开始请求
      xhr.open('GET', downloadUrl, true)
      
      // 设置请求头（如果需要）
      xhr.setRequestHeader('Cache-Control', 'no-cache')
      
      // 模拟准备阶段的进度增长
      let isPreparing = true
      
      const preparingInterval = setInterval(() => {
        if (isPreparing && currentProgress < 18) {
          currentProgress += 3 // 每次增加3%，让变化更明显
          updateDownloadState(formatIndex, {
            progress: currentProgress,
            status: 'preparing'
          })
          console.log(`Preparing progress updated: ${currentProgress}%`)
        }
      }, 400) // 每400ms增加一点进度
      
      // 清理准备进度定时器的函数
      const clearPreparingInterval = () => {
        console.log('Clearing preparing interval')
        isPreparing = false
        clearInterval(preparingInterval)
      }
      
      // 在状态变化时清理准备进度
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          // 连接已打开，但继续准备阶段
          console.log('XHR opened')
        } else if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
          // 收到响应头，清理准备进度，开始真正下载
          console.log('Headers received, clearing preparing interval')
          clearPreparingInterval()
          updateDownloadState(formatIndex, {
            progress: 20,
            status: 'downloading'
          })
        } else if (xhr.readyState === XMLHttpRequest.LOADING) {
          // 开始接收数据
          console.log('Loading started')
          clearPreparingInterval()
        }
      }
      
      xhr.send()
      
    } catch (err) {
      console.error('Download error:', err)
      updateDownloadState(formatIndex, {
        progress: 0,
        status: 'error',
        isDownloading: false
      })
      setError("下载失败，请稍后重试")

      // 3秒后重置错误状态
      setTimeout(() => {
        updateDownloadState(formatIndex, {
          status: 'idle'
        })
      }, 3000)
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
                    {videoInfo.formats.map((format, index) => {
                      const downloadState = downloadStates[index] || { isDownloading: false, progress: 0, status: 'idle' }
                      
                      return (
                        <div key={index} className="p-3 bg-white rounded border">
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <span className="font-medium">{format.quality}</span>
                              <span className="text-sm text-gray-500 ml-2">({format.format})</span>
                              <span className="text-sm text-gray-500 ml-2">{format.size}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleDownload(format.url, index)}
                                className="text-white relative overflow-hidden"
                                style={{ backgroundColor: '#6122f2' }}
                                disabled={downloadState.isDownloading}
                              >
                                {downloadState.isDownloading ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {downloadState.status === 'preparing' && `Preparing... ${downloadState.progress}%`}
                                    {downloadState.status === 'downloading' && (
                                      <span>
                                        Downloading {downloadState.progress}%
                                        {downloadState.downloadSpeed && (
                                          <span className="text-xs ml-1">
                                            ({downloadState.downloadSpeed})
                                          </span>
                                        )}
                                      </span>
                                    )}
                                  </>
                                ) : downloadState.status === 'completed' ? (
                                  <>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Completed
                                  </>
                                ) : downloadState.status === 'error' ? (
                                  <>
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Error
                                  </>
                                ) : downloadState.status === 'cancelled' ? (
                                  <>
                                    <AlertCircle className="mr-2 h-4 w-4" />
                                    Cancelled
                                  </>
                                ) : (
                                  <>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </>
                                )}
                              </Button>
                              
                              {downloadState.isDownloading && (
                                <Button
                                  onClick={() => cancelDownload(index)}
                                  variant="outline"
                                  size="sm"
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          {downloadState.isDownloading && (
                            <div className="mt-3">
                              <Progress 
                                value={downloadState.progress} 
                                className="w-full h-3 bg-gray-200"
                              />
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>
                                  {downloadState.status === 'preparing' && 'Preparing download...'}
                                  {downloadState.status === 'downloading' && (
                                    <>
                                      {downloadState.downloadSpeed && (
                                        <span className="font-medium text-blue-600">
                                          {downloadState.downloadSpeed}
                                        </span>
                                      )}
                                      {downloadState.fileSize && (
                                        <span className="ml-2">
                                          ({formatBytes(downloadState.bytesLoaded || 0)} / {downloadState.fileSize})
                                        </span>
                                      )}
                                    </>
                                  )}
                                </span>
                                <span className="font-medium">{downloadState.progress}%</span>
                              </div>
                              {downloadState.status === 'downloading' && downloadState.estimatedTime && (
                                <div className="text-xs text-gray-400 mt-1 text-center">
                                  剩余时间: {downloadState.estimatedTime}
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Completed message */}
                          {downloadState.status === 'completed' && (
                            <div className="mt-2 text-sm text-green-600 font-medium">
                              ✓ Download completed successfully!
                            </div>
                          )}
                          
                          {/* Error message */}
                          {downloadState.status === 'error' && (
                            <div className="mt-2 text-sm text-red-600 font-medium">
                              ✗ Download failed. Please try again.
                            </div>
                          )}
                          
                          {/* Cancelled message */}
                          {downloadState.status === 'cancelled' && (
                            <div className="mt-2 text-sm text-orange-600 font-medium">
                              ⚠ Download cancelled by user.
                            </div>
                          )}
                        </div>
                      )
                    })}
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
