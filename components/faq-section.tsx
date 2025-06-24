import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FadeInSection } from "@/components/animations/fade-in-section"

export function FaqSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <FadeInSection animationType="fadeUp" duration={0.8}>
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#6122f2' }}>Frequently Asked Questions</h2>
        </FadeInSection>

        <FadeInSection animationType="fadeUp" delay={0.2} duration={0.8}>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-medium">Is it free to download YouTube videos?</AccordionTrigger>
              <AccordionContent>
                Yes, our YouTube video downloader is completely free to use. You can download as many videos as you want without any charges or hidden fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-medium">What video qualities are available?</AccordionTrigger>
              <AccordionContent>
                We support various video qualities including 144p, 240p, 360p, 480p, 720p (HD), 1080p (Full HD), and 4K when available from the source video.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-medium">Do I need to install any software?</AccordionTrigger>
              <AccordionContent>
                No, our service is completely web-based. You don't need to install any software or browser extensions. Just paste the YouTube URL and download.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-medium">Is it legal to download YouTube videos?</AccordionTrigger>
              <AccordionContent>
                Downloading copyrighted content without permission may violate copyright laws. Please only download videos that you have the right to download, such as your own content or content with appropriate permissions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-lg font-medium">Can I download videos on mobile devices?</AccordionTrigger>
              <AccordionContent>
                Yes, our YouTube downloader works perfectly on all devices including smartphones, tablets, and desktop computers. The interface is fully responsive and mobile-friendly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </FadeInSection>
      </div>
    </section>
  )
}
