"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MegaMenu } from "./mega-menu"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "../contexts/language-context"
import Image from 'next/image'


export function Navbar() {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    // Track active section based on scroll position
    const handleScrollForActiveSection = () => {
      const sections = ["home", "services", "about", "team"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        const offset = 100 // Adjust based on navbar height

        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleScrollForActiveSection)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleScrollForActiveSection)
    }
  }, [])

  const navLinks = [
    { href: "/", label: t("nav.home"), id: "home" },
    { href: "#about", label: t("nav.about"), id: "about" },
    { href: "#team", label: t("nav.team"), id: "team" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "py-1 bg-white/90 backdrop-blur-md shadow-md",
      )}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setActiveSection("home")}>
            
            
            <Image
              src="/shortlogo.png"
              width={45}
              height={45}
              alt="logo"
            />
            <span
              className={cn(
                "font-bold text-xl transition-all duration-300",
                "text-primary",
                "group-hover:text-primary",
              )}
            >
              HIMOSOFT
            </span>  
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Home Link */}
            <Link
              href="#home"
              onClick={() => setActiveSection("home")}
              className={cn(
                "text-gray-600 hover:text-primary relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
              )}
            >
              {t("nav.home")}
              {activeSection === "home" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
              )}
            </Link>

            {/* Services Mega Menu */}
            <div
              className={cn(
                "relative",
                activeSection === "services" &&
                  "after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full",
              )}
            >
              <MegaMenu isScrolled={isScrolled} />
            </div>

            {/* Other Nav Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setActiveSection(link.id)}
                className={cn(
                  "text-gray-600 hover:text-primary relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
                  activeSection === link.id
                )}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher isScrolled={isScrolled} />
            <Link href="#footer" key="contactUsbtn">
              <Button
                className={cn(
                  "ml-6 transition-all duration-300 shadow-lg",
                  "bg-primary hover:bg-primary/90 text-white",
                )}
              >
                {t("nav.contactUs")}
              </Button>
            </Link>
            
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <LanguageSwitcher isScrolled={isScrolled} />
            <button
              className="p-2 rounded-md transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className={"text-gray-800"} />
              ) : (
                <Menu className={"text-gray-800"} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 rounded-lg bg-white/95 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col space-y-2">
              <Link
                href="#home"
                onClick={() => {
                  setActiveSection("home")
                  setIsMobileMenuOpen(false)
                }}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                  activeSection === "home"
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-primary/5 hover:text-primary",
                )}
              >
                {t("nav.home")}
              </Link>

              {/* Mobile Services Dropdown */}
              <div className="px-4 py-2">
                <div className="flex items-center justify-between text-sm font-medium text-primary">
                  <Link
                    href="/services"
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    {t("nav.services")}
                  </Link>
                </div>
                <div className="mt-2 pl-2 border-l-2 border-primary/10 space-y-1">
                  {[
                    "Corporate Software Development",
                    "Smart School",
                    "Smart Union",
                    "SMS Service",
                    "Optimize Managed Server Hosting",
                    "Professional Email",
                    "Business Domain Registration",
                  ].map((service, index) => (
                    <Link
                      key={index}
                      href={`/services/${service.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-1 text-xs text-primary transition-colors duration-200"
                    >
                      {service}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Mobile Links */}
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                    activeSection === link.id
                      ? "bg-primary/10 text-primary"
                      : "text-gray-600 hover:bg-primary/5 hover:text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="#footer" key="contactUsbtn">
                <Button className="mt-2 w-full bg-primary hover:bg-primary/90">{t("nav.contactUs")}</Button>
              </Link>
              
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

