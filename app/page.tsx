import { HeroSection } from "@/components/hero-section"
import { DownloaderSection } from "@/components/downloader-section"
import { StepsSection } from "@/components/steps-section"
import { QualitySection } from "@/components/quality-section"
import { AudioVideoSection } from "@/components/audio-video-section"
import { UnlimitedSection } from "@/components/unlimited-section"
import { FeaturesSection } from "@/components/features-section"
import { FaqSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
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
  )
}
