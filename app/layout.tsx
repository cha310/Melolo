import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://melolo.cc'),
  title: {
    default: "Melolo - Free YouTube Video Downloader",
    template: "%s | Melolo"
  },
  description: "Download YouTube videos for free in high quality. No registration required.",
  keywords: "YouTube downloader, download YouTube videos, YouTube to MP3, YouTube to MP4, free video downloader",
  authors: [{ name: "Melolo" }],
  creator: "Melolo",
  publisher: "Melolo",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icons/Melolo logo.png",
    shortcut: "/icons/Melolo logo.png",
    apple: "/icons/Melolo logo.png",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
