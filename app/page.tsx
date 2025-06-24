import { HeroSection } from "@/components/hero-section"
import { DownloaderSection } from "@/components/downloader-section"
import { StepsSection } from "@/components/steps-section"
import { QualitySection } from "@/components/quality-section"
import { AudioVideoSection } from "@/components/audio-video-section"
import { UnlimitedSection } from "@/components/unlimited-section"
import { FeaturesSection } from "@/components/features-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"
import { StructuredData } from "@/components/structured-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Melolo - Free YouTube Video Downloader | No Registration Required",
  description: "Download YouTube videos for free in high quality MP4 and MP3 formats. Fast, secure, and unlimited downloads with no registration required. Convert YouTube to MP3 or MP4 instantly.",
  keywords: "YouTube downloader, download YouTube videos, YouTube to MP3, YouTube to MP4, free video downloader, online video downloader",
  alternates: {
    canonical: "https://melolo.cc"
  },
  openGraph: {
    title: "Melolo - Free YouTube Video Downloader",
    description: "Download YouTube videos for free in high quality. No registration required.",
    url: "https://melolo.cc",
    siteName: "Melolo",
    type: "website",
    images: [{
      url: "/icons/Melolo logo.png",
      width: 1200,
      height: 630,
      alt: "Melolo YouTube Downloader"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Melolo - Free YouTube Video Downloader",
    description: "Download YouTube videos for free in high quality. No registration required.",
    images: ["/icons/Melolo logo.png"]
  }
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <HeroSection />
        <DownloaderSection />
        <StepsSection />
        <QualitySection />
        <AudioVideoSection />
        <UnlimitedSection />
        <FeaturesSection />
        <FaqSection />
        <Footer />
      </main>
    </>
  )
}
