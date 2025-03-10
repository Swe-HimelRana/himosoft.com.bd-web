import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "./contexts/language-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HimoSoft | Custom Software Development & IT Solutions",
  description:
    "HimoSoft provides top-tier software development, cloud solutions, and IT consulting. Transform your business with our innovative technology services.",
  keywords: [
    "software development",
    "custom software solutions",
    "IT consulting",
    "cloud solutions",
    "HimoSoft",
    "web development",
    "mobile app development",
    "enterprise software",
    "technology services",
    "server hosting",
    "linux server",
    "professional email"
  ],
  openGraph: {
    title: "HimoSoft | Custom Software Development & IT Solutions",
    description:
      "Leading software development and IT solutions provider. Build scalable, secure, and innovative applications with HimoSoft.",
    url: "https://himosoft.com.bd",
    type: "website",
    images: [
      {
        url: "https://himosoft.com.bd/og-image.jpg", // Replace with an actual image URL
        width: 1200,
        height: 630,
        alt: "HimoSoft - Custom Software Development & IT Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@HimoSoft", // Replace with your Twitter handle
    title: "HimoSoft | Custom Software Development & IT Solutions",
    description:
      "Expert software development services, cloud solutions, and IT consulting. Partner with HimoSoft to innovate and grow your business.",
    images: ["https://himosoft.com.bd/og-image.jpg"], // Replace with an actual image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
import './globals.css'