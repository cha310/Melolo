import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DisclaimerSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <Alert className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="text-amber-800 text-lg font-semibold">Disclaimer</AlertTitle>
          <AlertDescription className="text-amber-700">
            <p className="mb-2">
              Melolo YouTube Downloader is designed for educational and personal use only. By using our service, you
              acknowledge and agree to the following:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Downloading copyrighted content without permission may violate copyright laws.</li>
              <li>
                Our service should only be used to download videos that you have the right to download, such as your own
                content or content with appropriate permissions.
              </li>
              <li>Downloading videos may violate YouTube's Terms of Service.</li>
              <li>
                We do not host any of the videos on our servers. Our tool simply facilitates the downloading process.
              </li>
              <li>Melolo is not affiliated with YouTube or Google LLC.</li>
            </ul>
            <p className="mt-2">
              We respect intellectual property rights and expect our users to do the same. Use this service responsibly.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    </section>
  )
}
