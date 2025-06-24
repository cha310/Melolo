import { FadeInSection } from "@/components/animations/fade-in-section"

export function QualitySection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <FadeInSection animationType="fadeLeft" duration={0.8} className="lg:col-span-3">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight" style={{ color: '#2d3748' }}>
                Download YouTube Videos in HD, 1080p, or 4K
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                With our Free YouTube Video Downloader, you can easily grab your favorite videos from YouTube in crystal-clear HD, Full HD(1080p) or even 4K. Whether you're craving ultra-sharp visuals for a big screen or want high-quality playback on your phone or tablet, this downloader lets you enjoy your videos in stunning detail.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Enjoy fast, stable, and hassle-free YouTube video downloads, and save your favorite videos in high-quality MP4 format for offline viewing anytime. No buffering, no compromises—just pure, high-definition entertainment at your fingertips!
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection animationType="fadeRight" delay={0.2} duration={0.8} className="lg:col-span-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-6 shadow-2xl">
                {/* Video quality comparison */}
                <div className="space-y-4">
                  {/* 4K Quality */}
                  <div className="bg-white rounded-lg p-4 shadow-lg border-l-4" style={{ borderColor: '#6122f2' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold" style={{ color: '#6122f2' }}>4K Ultra HD</div>
                        <div className="text-sm text-gray-600">3840 x 2160 • Premium Quality</div>
                      </div>
                      <div className="w-12 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">4K</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 1080p Quality */}
                  <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-blue-400">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-blue-600">1080p Full HD</div>
                        <div className="text-sm text-gray-600">1920 x 1080 • High Quality</div>
                      </div>
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">HD</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 720p Quality */}
                  <div className="bg-white rounded-lg p-4 shadow-lg border-l-4 border-green-400">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-bold text-green-600">720p HD</div>
                        <div className="text-sm text-gray-600">1280 x 720 • Standard Quality</div>
                      </div>
                      <div className="w-12 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">720</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Format indicator */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-xs font-bold">MP4</span>
                    </div>
                    <span className="font-semibold text-gray-700">Universal Format</span>
                  </div>
                </div>
                
                {/* Floating quality badges */}
                <div className="absolute -top-4 -right-4">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                    Ultra HD
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