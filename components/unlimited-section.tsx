import { FadeInSection } from "@/components/animations/fade-in-section"

export function UnlimitedSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <FadeInSection animationType="fadeLeft" duration={0.8} className="lg:col-span-3">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight" style={{ color: '#2d3748' }}>
                Free and Unlimited YouTube Video Downloads
              </h2>
              <p className="text-base text-gray-600 mb-6 leading-relaxed">
                Enjoy unlimited YouTube video downloads without any restrictions. No subscription fees, no hidden costs, and no download limits. Download as many videos as you want, whenever you want, completely free of charge.
              </p>
              <p className="text-base text-gray-600 leading-relaxed">
                Our service remains free forever, giving you the freedom to build your offline video library without worrying about quotas or premium upgrades.
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection animationType="fadeRight" delay={0.4} duration={0.8} className="lg:col-span-2">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-6 shadow-2xl">
                {/* Unlimited Features */}
                <div className="space-y-4">
                  {/* Free Forever */}
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-bold" style={{ color: '#6122f2' }}>100% Free</div>
                        <div className="text-sm text-gray-600">No subscription required</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* No Limits */}
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-blue-600">Unlimited Downloads</div>
                        <div className="text-sm text-gray-600">No daily or monthly limits</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* No Registration */}
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">No Registration</div>
                        <div className="text-sm text-gray-600">Start downloading instantly</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* No Ads */}
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-600">No Annoying Ads</div>
                        <div className="text-sm text-gray-600">Clean, ad-free experience</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Download counter */}
                <div className="mt-6 text-center">
                  <div className="bg-white rounded-full px-6 py-4 shadow-lg">
                    <div className="text-2xl font-bold" style={{ color: '#6122f2' }}>∞</div>
                    <div className="text-sm text-gray-600 font-medium">Downloads Available</div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4">
                  <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                    Forever Free
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    No Limits
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