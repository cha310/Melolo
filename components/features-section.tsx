import { Download, Shield, Zap, Smartphone } from "lucide-react"
import { FadeInSection } from "@/components/animations/fade-in-section"

export function FeaturesSection() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto px-8 lg:px-16">
        <FadeInSection animationType="fadeUp" duration={0.8}>
          <h2 className="text-4xl lg:text-5xl font-bold text-center mb-8 leading-tight" style={{ color: '#2d3748' }}>
            Why Choose Melolo YouTube Downloader
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-4xl mx-auto leading-relaxed">
            Experience the ultimate YouTube downloading solution with our powerful, secure, and user-friendly platform
          </p>
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FadeInSection animationType="fadeUp" delay={0.2} duration={0.8}>
            <div className="relative text-center bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-xl mb-6" style={{ backgroundColor: '#f8f5ff' }}>
                <Download className="h-8 w-8" style={{ color: '#6122f2' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#2d3748' }}>High Quality Downloads</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Download YouTube videos in crystal-clear quality completely free without any limitations or hidden fees.
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection animationType="fadeUp" delay={0.4} duration={0.8}>
            <div className="relative text-center bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-xl mb-6" style={{ backgroundColor: '#f0fdf4' }}>
                <Shield className="h-8 w-8" style={{ color: '#16a34a' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#2d3748' }}>100% Safe & Secure</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your privacy matters. We don't store any personal information and ensure complete data security.
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection animationType="fadeUp" delay={0.6} duration={0.8}>
            <div className="relative text-center bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-xl mb-6" style={{ backgroundColor: '#fef3c7' }}>
                <Zap className="h-8 w-8" style={{ color: '#f59e0b' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#2d3748' }}>Lightning Fast</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Get your downloads in seconds with our optimized servers and advanced technology.
              </p>
            </div>
          </FadeInSection>
          
          <FadeInSection animationType="fadeUp" delay={0.8} duration={0.8}>
            <div className="relative text-center bg-white border border-gray-100 rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-xl mb-6" style={{ backgroundColor: '#f0f9ff' }}>
                <Smartphone className="h-8 w-8" style={{ color: '#0ea5e9' }} />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: '#2d3748' }}>Mobile Friendly</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Works seamlessly on all devices - desktop, tablet, and mobile with responsive design.
              </p>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  )
}
