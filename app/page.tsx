import { HeroSection } from "@/components/hero-section"
import { DownloaderSection } from "@/components/downloader-section"
import { FeaturesSection } from "@/components/features-section"
import { HowToSection } from "@/components/how-to-section"
import { FaqSection } from "@/components/faq-section"
import { DisclaimerSection } from "@/components/disclaimer-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <DownloaderSection />
      <FeaturesSection />
      <HowToSection />
      <FaqSection />
      <DisclaimerSection />
      <Footer />
    </main>
  )
}
