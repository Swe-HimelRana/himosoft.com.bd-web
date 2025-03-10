"use client"

import { useEffect, useRef } from "react"

export function HeroClipPath() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create multiple SVG blobs
    const createBlob = () => {
      const blob = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      blob.setAttribute("viewBox", "0 0 200 200")
      blob.setAttribute("xmlns", "http://www.w3.org/2000/svg")
      blob.style.position = "absolute"
      blob.style.width = `${Math.random() * 400 + 300}px`
      blob.style.height = `${Math.random() * 400 + 300}px`
      blob.style.top = `${Math.random() * 100 - 50}%`
      blob.style.left = `${Math.random() * 100 - 20}%`
      blob.style.opacity = `${Math.random() * 0.5 + 0.2}`
      blob.style.transform = `rotate(${Math.random() * 360}deg)`
      blob.style.filter = "blur(40px)"
      blob.style.transition = "all 20s ease-in-out"

      // Create random path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path")

      // Generate random blob path
      const points = 8 + Math.floor(Math.random() * 5)
      let pathData = "M"

      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2
        const radius = 80 + Math.random() * 20
        const x = 100 + Math.cos(angle) * radius
        const y = 100 + Math.sin(angle) * radius

        if (i === 0) {
          pathData += `${x},${y}`
        } else {
          const cp1x = 100 + Math.cos(angle - Math.PI / points) * radius * 1.2
          const cp1y = 100 + Math.sin(angle - Math.PI / points) * radius * 1.2
          const cp2x = 100 + Math.cos(angle - Math.PI / (points * 2)) * radius * 1.2
          const cp2y = 100 + Math.sin(angle - Math.PI / (points * 2)) * radius * 1.2

          pathData += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`
        }
      }

      pathData += "Z"
      path.setAttribute("d", pathData)

      // Set random green gradient
      const greenShades = [
        "rgba(17, 131, 93, 0.7)", // Primary green
        "rgba(21, 126, 93, 0.8)", // Darker green
        "rgba(52, 211, 153, 0.6)", // Lighter green
        "rgba(6, 95, 70, 0.7)", // Deep green
        "rgba(110, 231, 183, 0.5)", // Very light green
      ]

      const randomGreen = greenShades[Math.floor(Math.random() * greenShades.length)]
      path.setAttribute("fill", randomGreen)

      blob.appendChild(path)
      container.appendChild(blob)

      // Animate the blob
      setTimeout(() => {
        blob.style.top = `${Math.random() * 100 - 50}%`
        blob.style.left = `${Math.random() * 100 - 20}%`
        blob.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.5})`
      }, 100)

      // Remove and recreate blob after animation
      setTimeout(() => {
        blob.remove()
        createBlob()
      }, 20000)
    }

    // Create initial blobs
    for (let i = 0; i < 6; i++) {
      createBlob()
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute top-0 left-0 w-full h-[90vh] overflow-hidden -z-10"
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
        background: "linear-gradient(135deg, rgba(240, 253, 244, 1) 0%, rgba(220, 252, 231, 0.8) 100%)",
      }}
    />
  )
}

