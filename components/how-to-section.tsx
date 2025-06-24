export function HowToSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">How to Download YouTube Videos</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Copy YouTube URL</h3>
            <p className="text-gray-600">
              Find the video you want to download on YouTube and copy the URL from the address bar.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Paste URL</h3>
            <p className="text-gray-600">Paste the YouTube video URL into the input field on our website.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Download</h3>
            <p className="text-gray-600">
              Click the download button, select your preferred quality, and save the video to your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
