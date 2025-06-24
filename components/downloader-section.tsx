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
  xhr?: XMLHttpRequest // Store XHR instance for cancellation
}

export function DownloaderSection() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [downloadStates, setDownloadStates] = useState<Record<number, DownloadState>>({})
  
  // Helper function to format byte size
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
      setError("Please enter a YouTube video URL")
      return
    }

    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      setError("Please enter a valid YouTube video URL")
      return
    }

    setLoading(true)
    setError("")
    setVideoInfo(null)
    setDownloadStates({}) // Reset download states

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
        throw new Error(data.message || "Failed to fetch video information")
      }

      setVideoInfo(data)
    } catch (err) {
      let errorMessage = "An unexpected error occurred, please try again later"
      
      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      }
      
      // Handle network errors
      if (errorMessage.includes('Failed to fetch')) {
        errorMessage = "Network connection failed, please check your connection and try again"
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
      
      // Reset status after 3 seconds
      setTimeout(() => {
        updateDownloadState(formatIndex, {
          status: 'idle'
        })
      }, 3000)
    }
  }

  const handleDownload = async (downloadUrl: string, formatIndex: number) => {
    try {
      // Create XMLHttpRequest
      const xhr = new XMLHttpRequest()
      
      // Initialize download state
      updateDownloadState(formatIndex, {
        isDownloading: true,
        progress: 0,
        status: 'preparing',
        xhr: xhr
      })
      
      // Set response type to blob
      xhr.responseType = 'blob'
      
      // Variables for calculating download speed
      let startTime = Date.now()
      let lastTime = startTime
      let lastLoaded = 0
      
      // Format file size
      const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
      }
      
      // Format time
      const formatTime = (seconds: number): string => {
        if (seconds < 60) return `${Math.round(seconds)}s`
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.round(seconds % 60)
        return `${minutes}m ${remainingSeconds}s`
      }
      
      // Immediately show initial progress and start preparation phase simulation
      let currentProgress = 5 // Start from 5% for more visibility
      updateDownloadState(formatIndex, {
        progress: currentProgress,
        status: 'preparing'
      })
      
      console.log(`Starting download for format ${formatIndex}, initial progress: ${currentProgress}%`)
      
      // Listen for download progress
      xhr.onprogress = (event) => {
        if (event.lengthComputable) {
          // Map real download progress to 20-100% range
          const rawProgress = (event.loaded / event.total) * 100
          const progress = Math.round(20 + (rawProgress * 0.8)) // 20% + 80% * real progress
          const currentTime = Date.now()
          const timeDiff = (currentTime - lastTime) / 1000 // seconds
          const bytesDiff = event.loaded - lastLoaded
          
          // Calculate download speed (update every second)
          let downloadSpeed = ''
          let estimatedTime = ''
          
          if (timeDiff > 1) { // Update speed every second
            const speed = bytesDiff / timeDiff // bytes per second
            downloadSpeed = formatFileSize(speed) + '/s'
            
            // Calculate remaining time
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
      
      // Listen for download completion
      xhr.onload = () => {
        if (xhr.status === 200) {
          // Download completed, create Blob URL and trigger download
          const blob = xhr.response
          const url = window.URL.createObjectURL(blob)
          
          // Get filename from response headers, or use default name
          const contentDisposition = xhr.getResponseHeader('Content-Disposition')
          let filename = 'melolo_download'
          
          if (contentDisposition) {
            const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)
            if (filenameMatch && filenameMatch[1]) {
              filename = filenameMatch[1].replace(/['"]/g, '')
            }
          }
          
          // Create download link
          const link = document.createElement('a')
          link.href = url
          link.download = filename
          link.style.display = 'none'
          document.body.appendChild(link)
          link.click()
          
          // Clean up resources
          document.body.removeChild(link)
          window.URL.revokeObjectURL(url)
          
          // Update status to completed
          updateDownloadState(formatIndex, {
            progress: 100,
            status: 'completed',
            isDownloading: false,
            xhr: undefined
          })
          
          // Reset status after 3 seconds
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
      
      // Listen for errors
      xhr.onerror = () => {
        clearPreparingInterval()
        updateDownloadState(formatIndex, {
          progress: 0,
          status: 'error',
          isDownloading: false,
          xhr: undefined
        })
        setError("Network error, download failed")
        
        // Reset error status after 3 seconds
        setTimeout(() => {
          updateDownloadState(formatIndex, {
            status: 'idle'
          })
        }, 3000)
      }
      
      // Listen for cancel/abort
      xhr.onabort = () => {
        clearPreparingInterval()
        updateDownloadState(formatIndex, {
          progress: 0,
          status: 'cancelled',
          isDownloading: false,
          xhr: undefined
        })
        
        // Reset status after 3 seconds
        setTimeout(() => {
          updateDownloadState(formatIndex, {
            status: 'idle'
          })
        }, 3000)
      }
      
      // Listen for timeout
      xhr.ontimeout = () => {
        clearPreparingInterval()
        updateDownloadState(formatIndex, {
          progress: 0,
          status: 'error',
          isDownloading: false
        })
        setError("Download timeout, please check your network connection")
        
        // Reset error status after 3 seconds
        setTimeout(() => {
          updateDownloadState(formatIndex, {
            status: 'idle'
          })
        }, 3000)
      }
      
      // Set timeout (10 minutes)
      xhr.timeout = 10 * 60 * 1000
      

      
      // Start request
      xhr.open('GET', downloadUrl, true)
      
      // Set request headers (if needed)
      xhr.setRequestHeader('Cache-Control', 'no-cache')
      
      // Simulate progress growth in preparation phase
      let isPreparing = true
      
      const preparingInterval = setInterval(() => {
        if (isPreparing && currentProgress < 18) {
          currentProgress += 3 // Increase by 3% each time for more visibility
          updateDownloadState(formatIndex, {
            progress: currentProgress,
            status: 'preparing'
          })
          console.log(`Preparing progress updated: ${currentProgress}%`)
        }
      }, 400) // Add a bit of progress every 400ms
      
      // Function to clear preparation progress timer
      const clearPreparingInterval = () => {
        console.log('Clearing preparing interval')
        isPreparing = false
        clearInterval(preparingInterval)
      }
      
      // Clean up preparation progress on state changes
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          // Connection opened, but continue preparation phase
          console.log('XHR opened')
        } else if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
          // Headers received, clear preparation progress, start real download
          console.log('Headers received, clearing preparing interval')
          clearPreparingInterval()
          updateDownloadState(formatIndex, {
            progress: 20,
            status: 'downloading'
          })
        } else if (xhr.readyState === XMLHttpRequest.LOADING) {
          // Start receiving data
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
      setError("Download failed, please try again later")

      // Reset error status after 3 seconds
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
                                  Remaining time: {downloadState.estimatedTime}
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
