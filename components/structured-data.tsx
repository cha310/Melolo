export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Melolo",
    "description": "Free YouTube video downloader that allows you to download YouTube videos in high quality MP4 and MP3 formats without registration.",
    "url": "https://melolo.cc",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "Melolo"
    },
    "featureList": [
      "Download YouTube videos in MP4 format",
      "Convert YouTube videos to MP3",
      "High quality video downloads",
      "No registration required",
      "Unlimited downloads",
      "Fast and secure"
    ],
    "screenshot": "https://melolo.cc/icons/Melolo logo.png"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
} 