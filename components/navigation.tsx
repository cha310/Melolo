"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="flex items-center h-16 justify-start">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center justify-center hover:opacity-80 transition-opacity">
            <Image
              src="/icons/Melolo.svg"
              alt="Melolo Logo"
              width={72}
              height={72}
              className="w-18 h-18"
            />
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8 ml-8">
            {/* Free Tools Dropdown */}
            <div className="relative group">
              <div className="flex items-center space-x-1 text-gray-700 group transition-colors cursor-pointer py-2 px-3">
                <span className="group-hover:text-[#6122f2] transition-colors">Free Tools</span>
                <ChevronDown className="h-4 w-4 group-hover:text-[#6122f2] transition-colors" />
              </div>
              <div className="absolute top-full left-0 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/youtube-downloader"
                  className="block px-6 py-4 text-base text-gray-700 hover:bg-gray-100 hover:text-[#6122f2] transition-colors"
                >
                  YouTube Downloader
                </Link>
              </div>
            </div>

            {/* Direct Links */}
            <Link href="/blog" className="text-gray-700 hover:text-[#6122f2] transition-colors">
              Blog
            </Link>

            <Link href="/faqs" className="text-gray-700 hover:text-[#6122f2] transition-colors">
              FAQs
            </Link>
          </div>

          {/* Mobile Menu Button - positioned on the right */}
          <div className="md:hidden ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center">
                    YouTube Video Downloader
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog" className="flex items-center">
                    Blog
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/faqs" className="flex items-center">
                    FAQs
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
