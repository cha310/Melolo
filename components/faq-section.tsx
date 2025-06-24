import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-900">Frequently Asked Questions</h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium">
              Is Melolo YouTube Downloader completely free?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, Melolo YouTube Downloader is completely free to use. There are no hidden fees or premium features
              that require payment.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium">What video formats can I download?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              You can download videos in various formats including MP4, WebM, and audio formats like MP3. We offer
              different quality options from 360p up to 4K (if available).
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-medium">Is it legal to download YouTube videos?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Downloading videos from YouTube may violate YouTube's Terms of Service. Our tool is intended for
              downloading videos that you have the right to download, such as your own content or content with
              appropriate permissions. Always respect copyright laws and the creator's rights.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-medium">Do I need to install any software?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              No, Melolo YouTube Downloader is a web-based tool. You don't need to install any software or browser
              extensions to use it.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg font-medium">Why can't I download some videos?</AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Some videos may be protected or restricted by YouTube, making them impossible to download. Additionally,
              very new or very popular videos might be temporarily unavailable due to YouTube's security measures.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
