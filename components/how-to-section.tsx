export function HowToSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#6122f2' }}>How to Download YouTube Videos</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#6122f2' }}>
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Paste URL</h3>
            <p className="text-gray-600">
              Copy and paste the YouTube video URL into the input box above.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#6122f2' }}>
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Format</h3>
            <p className="text-gray-600">Select your preferred video quality and format.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4" style={{ backgroundColor: '#6122f2' }}>
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Download</h3>
            <p className="text-gray-600">Click the download button and save your video.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
