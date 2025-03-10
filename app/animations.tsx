"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("animate-fade-up")
              entry.target.classList.remove("opacity-0")
              entry.target.classList.add("opacity-100")
            }, delay)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [delay])

  return (
    <div ref={sectionRef} className={`opacity-0 transition-all duration-700 ${className}`}>
      {children}
    </div>
  )
}

export function FloatingElement({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`animate-float ${className}`}>{children}</div>
}

export function PulseElement({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`animate-pulse-gentle ${className}`}>{children}</div>
}

