import { Download, Shield, Zap, Smartphone } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#6122f2' }}>Why Choose Melolo YouTube Downloader</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: '#f3f0ff' }}>
              <Download className="h-8 w-8" style={{ color: '#6122f2' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">High Quality Downloads</h3>
            <p className="text-gray-600">
              Download YouTube videos completely free without any limitations or hidden fees.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: '#f3f0ff' }}>
              <Shield className="h-8 w-8" style={{ color: '#6122f2' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">100% Safe & Secure</h3>
            <p className="text-gray-600">
              Your data is completely safe with us. We don't store any personal information.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: '#f3f0ff' }}>
              <Zap className="h-8 w-8" style={{ color: '#6122f2' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Get your downloads in seconds with our optimized servers.</p>
          </div>

          <div className="text-center">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full mb-4" style={{ backgroundColor: '#f3f0ff' }}>
              <Smartphone className="h-8 w-8" style={{ color: '#6122f2' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
            <p className="text-gray-600">Works perfectly on all devices - desktop, tablet, and mobile.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
