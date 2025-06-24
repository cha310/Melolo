"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            {/* Melolo SVG Logo */}
            <Link href="/" className="w-30 h-30 flex items-center justify-center hover:opacity-80 transition-opacity">
              <Image
                src="/icons/Melolo.svg"
                alt="Melolo Logo"
                width={72}
                height={72}
                className="w-30 h-30"
              />
            </Link>
          </div>

          {/* Navigation Items - positioned right next to brand */}
          <div className="hidden md:flex items-center ml-8 space-x-6">
            <div className="relative group">
              <Button
                variant="ghost"
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 group-hover:text-purple-600"
              >
                <span>Free Tools</span>
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </Button>

              {/* Dropdown content that appears on hover */}
              <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-purple-600 transition-colors"
                  >
                    YouTube Video Downloader
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/blog" className="text-gray-700 hover:text-purple-600 transition-colors">
              Blog
            </Link>

            <Link href="/faqs" className="text-gray-700 hover:text-purple-600 transition-colors">
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
                  <Link href="/coming-soon" className="flex items-center text-gray-500">
                    More tools coming soon...
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
