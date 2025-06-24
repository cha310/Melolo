import { FadeInSection } from "@/components/animations/fade-in-section"

export function AudioVideoSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <FadeInSection animationType="fadeLeft" duration={0.8} className="lg:col-span-3">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight" style={{ color: '#2d3748' }}>
                Download YouTube Video With or Without Audio
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Whether you need the full video with audio for entertainment or just the video track for editing purposes, our downloader gives you complete control. Extract audio-only files in MP3 format for music lovers, or download video-only files for creative projects.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Perfect for content creators, music enthusiasts, and anyone who wants flexibility in their downloads. Choose what you need, when you need it.
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection animationType="fadeRight" delay={0.3} duration={0.8} className="lg:col-span-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-3xl p-6 shadow-2xl">
                {/* Audio Video Toggle */}
                <div className="space-y-6">
                  {/* Video + Audio Option */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold" style={{ color: '#6122f2' }}>Video + Audio</h3>
                        <p className="text-gray-600">Complete video with sound</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">MP4 Format</span>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Recommended
                      </div>
                    </div>
                  </div>
                  
                  {/* Audio Only Option */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM15.657 6.343a1 1 0 011.414 0A9.972 9.972 0 0119 12a9.972 9.972 0 01-1.929 5.657 1 1 0 11-1.414-1.414A7.971 7.971 0 0017 12c0-1.933-.685-3.71-1.829-5.1a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-purple-600">Audio Only</h3>
                        <p className="text-gray-600">Extract music & podcasts</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">MP3 Format</span>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        High Quality
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Only Option */}
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-orange-600">Video Only</h3>
                        <p className="text-gray-600">Silent video for editing</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">MP4 Format</span>
                      <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        Creator Tools
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating download icon */}
                <div className="absolute -top-4 -left-4">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
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