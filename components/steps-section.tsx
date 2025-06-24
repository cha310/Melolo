import { FadeInSection } from "@/components/animations/fade-in-section"

export function StepsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          {/* Left side - Text content */}
          <FadeInSection animationType="fadeLeft" duration={0.8} className="lg:col-span-3">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-8 leading-tight" style={{ color: '#2d3748' }}>
                How to Download YouTube Videos in 3 Simple Steps?
              </h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Follow these easy steps to download your favorite YouTube videos in high quality.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    1. Copy the YouTube Video URL.
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Find the YouTube video you want to download and copy its URL from the address bar or use YouTube's share function to get the URL.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    2. Paste the URL into the free YouTube Video Downloader.
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Go to our website and paste the copied YouTube video URL into the YouTube Video Downloader tool.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">
                    3. Click Download and Enjoy.
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Hit the download button, and your YouTube video will be saved in lossless quality for free. Enjoy watching anytime, anywhere!
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
          
          {/* Right side - Illustration */}
          <FadeInSection animationType="fadeRight" delay={0.3} duration={0.8} className="lg:col-span-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-6 shadow-2xl">
                {/* Mock laptop/browser window */}
                <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
                  {/* Browser top bar */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-700 rounded ml-4 h-8 flex items-center px-3">
                      <span className="text-gray-300 text-sm">youtube.com/watch?v=...</span>
                    </div>
                  </div>
                  
                  {/* Video thumbnail area */}
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 rounded h-48 flex items-center justify-center relative">
                    <div className="text-white text-6xl">▶</div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-bold">
                        YouTube
                      </div>
                    </div>
                  </div>
                  
                  {/* Video info */}
                  <div className="mt-4 space-y-2">
                    <div className="bg-gray-700 rounded h-4 w-3/4"></div>
                    <div className="bg-gray-700 rounded h-3 w-1/2"></div>
                  </div>
                </div>
                
                {/* Download button highlight */}
                <div className="absolute -bottom-4 -right-4">
                  <div className="text-white px-6 py-3 rounded-lg font-medium shadow-lg animate-pulse" style={{ backgroundColor: '#6122f2' }}>
                    Download
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
} 