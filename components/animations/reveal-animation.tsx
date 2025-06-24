"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface RevealAnimationProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  className?: string
}

export function RevealAnimation({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  className = ""
}: RevealAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { y: 60, opacity: 0 }
      case "down":
        return { y: -60, opacity: 0 }
      case "left":
        return { x: 60, opacity: 0 }
      case "right":
        return { x: -60, opacity: 0 }
      default:
        return { y: 60, opacity: 0 }
    }
  }

  const getFinalPosition = () => {
    switch (direction) {
      case "up":
      case "down":
        return { y: 0, opacity: 1 }
      case "left":
      case "right":
        return { x: 0, opacity: 1 }
      default:
        return { y: 0, opacity: 1 }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={getInitialPosition()}
        animate={isVisible ? getFinalPosition() : getInitialPosition()}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.25, 0.25, 0.75]
        }}
      >
        {children}
      </motion.div>
    </div>
  )
} 