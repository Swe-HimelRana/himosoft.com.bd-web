"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 0.7 // 70% of viewport height
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Define colors
    const colors = [
      "rgba(16, 185, 129, 0.7)", // Primary green
      "rgba(5, 150, 105, 0.6)", // Darker green
      "rgba(52, 211, 153, 0.5)", // Lighter green
      "rgba(16, 185, 129, 0.4)", // Primary green with opacity
      "rgba(5, 150, 105, 0.3)", // Darker green with opacity
    ]

    // Create blobs
    class Blob {
      x: number
      y: number
      radius: number
      color: string
      velocity: { x: number; y: number }
      angle: number
      angleSpeed: number
      pulseSpeed: number
      pulseAmount: number
      currentRadius: number

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = {
          x: (Math.random() - 0.5) * 0.7,
          y: (Math.random() - 0.5) * 0.7,
        }
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = 0.001 + Math.random() * 0.003
        this.pulseSpeed = 0.01 + Math.random() * 0.02
        this.pulseAmount = 0.1 + Math.random() * 0.2
        this.currentRadius = radius
      }

      update() {
        this.angle += this.angleSpeed
        this.currentRadius = this.radius * (1 + Math.sin(this.angle) * this.pulseAmount)

        this.x += this.velocity.x
        this.y += this.velocity.y

        // Bounce off edges
        if (this.x + this.currentRadius > canvas.width || this.x - this.currentRadius < 0) {
          this.velocity.x = -this.velocity.x
        }

        if (this.y + this.currentRadius > canvas.height || this.y - this.currentRadius < 0) {
          this.velocity.y = -this.velocity.y
        }
      }

      draw() {
        if (!ctx) return

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.currentRadius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
      }
    }

    // Create blobs
    const blobs: Blob[] = []
    for (let i = 0; i < 15; i++) {
      const radius = Math.random() * 150 + 50
      const x = Math.random() * (canvas.width - radius * 2) + radius
      const y = Math.random() * (canvas.height - radius * 2) + radius
      const color = colors[Math.floor(Math.random() * colors.length)]
      blobs.push(new Blob(x, y, radius, color))
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw blobs
      blobs.forEach((blob) => {
        blob.update()
        blob.draw()
      })

      // Apply clipping mask effect
      ctx.globalCompositeOperation = "source-in"

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "rgba(16, 185, 129, 0.9)")
      gradient.addColorStop(0.5, "rgba(5, 150, 105, 0.8)")
      gradient.addColorStop(1, "rgba(52, 211, 153, 0.7)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Reset composite operation
      ctx.globalCompositeOperation = "source-over"

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[70vh] -z-10"
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)" }}
    />
  )
}

