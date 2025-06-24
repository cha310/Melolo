"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface FadeInSectionProps {
  children: React.ReactNode
  className?: string
  animationType?: "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "blur"
  delay?: number
  duration?: number
  stagger?: boolean
}

export function FadeInSection({ 
  children, 
  className = "",
  animationType = "fadeUp",
  delay = 0,
  duration = 0.8,
  stagger = false
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
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

  const getAnimationVariants = () => {
    switch (animationType) {
      case "fadeUp":
        return {
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 }
        }
      case "fadeDown":
        return {
          hidden: { opacity: 0, y: -60 },
          visible: { opacity: 1, y: 0 }
        }
      case "fadeLeft":
        return {
          hidden: { opacity: 0, x: -60 },
          visible: { opacity: 1, x: 0 }
        }
      case "fadeRight":
        return {
          hidden: { opacity: 0, x: 60 },
          visible: { opacity: 1, x: 0 }
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        }
      case "blur":
        return {
          hidden: { opacity: 0, filter: "blur(10px)" },
          visible: { opacity: 1, filter: "blur(0px)" }
        }
      default:
        return {
          hidden: { opacity: 0, y: 60 },
          visible: { opacity: 1, y: 0 }
        }
    }
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger ? 0.1 : 0,
        delayChildren: delay
      }
    }
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        variants={stagger ? containerVariants : getAnimationVariants()}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{
          duration,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {stagger ? (
          <motion.div variants={getAnimationVariants()}>
            {children}
          </motion.div>
        ) : (
          children
        )}
      </motion.div>
    </div>
  )
} 