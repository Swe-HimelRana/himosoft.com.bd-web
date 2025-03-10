"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from "lucide-react"
import { AnimatedSection } from "../animations"
import { useLanguage } from "../contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const pageHeight = document.body.offsetHeight

      // When user is near the bottom of the page
      if (pageHeight - scrollPosition < 300) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer id="footer" className="w-full py-12 bg-gradient-to-r from-primary/5 to-primary/10 border-t border-primary/10 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <AnimatedSection
            className={`space-y-4 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center">
                <span className="font-bold text-xl">H</span>
              </div>
              <span className="font-bold text-xl text-primary">HimoSoft</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t("footer.description")}</p>
            <p className="text-xs text-muted-foreground">{t("footer.copyright")}</p>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection
            delay={200}
            className={`space-y-4 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h3 className="font-medium text-lg">{t("footer.quickLinks")}</h3>
            <nav className="grid grid-cols-2 gap-2">
              <Link
                href="#home"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t("nav.home")}
              </Link>
              <Link
                href="#services"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t("nav.services")}
              </Link>
              <Link
                href="#about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t("nav.about")}
              </Link>
              <Link
                href="#team"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t("nav.team")}
              </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t("footer.termsOfService")}
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {t("footer.privacyPolicy")}
              </Link>
            </nav>
          </AnimatedSection>

          {/* Get in Touch */}
          <AnimatedSection
            delay={400}
            className={`space-y-4 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <h3 className="font-medium text-lg">{t("footer.getInTouch")}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">
                  info@himosoft.com.bd
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">
                  +8801870955054 or +8801315770487
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors duration-200">
                  Tapir Bari, Sreepur, Gazipur, Tengra-1740
                </span>
              </div>
            </div>

            {/* Social Media */}
            {/* <div className="flex gap-3 pt-2">
              <Link href="#" className="group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <Github className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <Linkedin className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <Twitter className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
              <Link href="#" className="group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
                  <Instagram className="h-4 w-4 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
              </Link>
            </div> */}
          </AnimatedSection>
        </div>
      </div>
    </footer>
  )
}

