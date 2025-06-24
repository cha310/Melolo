"use client"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-purple-50 to-white py-20 px-4 pt-24">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-purple-900">Melolo YouTube Video Downloader</h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-700 max-w-3xl mx-auto">
          Download YouTube videos for free in high quality. No registration required.
        </p>
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-lg"
          onClick={() => {
            const downloaderSection = document.getElementById("downloader-section")
            if (downloaderSection) {
              downloaderSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Start Downloading Now
        </Button>
      </div>
    </section>
  )
}
