"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import {
  Building2,
  GraduationCap,
  Users,
  MessageSquare,
  Server,
  Mail,
  Globe,
  ChevronDown,
  Code,
  Database,
  LayoutGrid,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "../contexts/language-context"

interface MegaMenuProps {
  isScrolled: boolean
}

export function MegaMenu({ isScrolled }: MegaMenuProps) {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Services data with icons and descriptions
  const services = [
    {
      icon: <Building2 className="h-5 w-5" />,
      title: t("megaMenu.corporateSoftware"),
      description: t("megaMenu.corporateSoftwareDesc"),
      href: "/",
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: t("megaMenu.smartSchool"),
      description: t("megaMenu.smartSchoolDesc"),
      href: "/",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: t("megaMenu.smartUnion"),
      description: t("megaMenu.smartUnionDesc"),
      href: "/",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: t("megaMenu.smsService"),
      description: t("megaMenu.smsServiceDesc"),
      href: "/",
    },
    {
      icon: <Server className="h-5 w-5" />,
      title: t("megaMenu.serverHosting"),
      description: t("megaMenu.serverHostingDesc"),
      href: "/",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: t("megaMenu.professionalEmail"),
      description: t("megaMenu.professionalEmailDesc"),
      href: "/",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: t("megaMenu.domainRegistration"),
      description: t("megaMenu.domainRegistrationDesc"),
      href: "/",
    },
  ]

  // Featured services
  const featuredServices = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: t("megaMenu.customSoftware"),
      description: t("megaMenu.customSoftwareDesc"),
      href: "/",
    },
    {
      icon: <Database className="h-6 w-6 text-primary" />,
      title: t("megaMenu.databaseSolutions"),
      description: t("megaMenu.databaseSolutionsDesc"),
      href: "/",
    },
    {
      icon: <LayoutGrid className="h-6 w-6 text-primary" />,
      title: t("megaMenu.mobileApps"),
      description: t("megaMenu.mobileAppsDesc"),
      href: "/",
    },
  ]

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex text-gray-600 hover:text-primary items-center gap-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300",
           
        )}
      >
        {t("nav.services")}
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
      </button>

      {/* Mega Menu */}
      {isOpen && (
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-screen max-w-4xl px-4">
          <div className="overflow-hidden rounded-xl shadow-xl ring-1 ring-black ring-opacity-5">
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 lg:p-8">
              {/* Left column - Service categories */}
              <div className="col-span-1">
                <div className="mb-3 border-b border-gray-100 pb-2">
                  <h3 className="text-sm font-semibold text-primary">{t("megaMenu.serviceCategories")}</h3>
                </div>
                <div className="grid gap-3">
                  {services.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="group flex items-center gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-primary/5"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
                        <span className="text-primary">{service.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                          {service.title}
                        </p>
                        <p className="text-xs text-gray-500">{service.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right column - Featured services */}
              <div className="col-span-1 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6">
                <div className="mb-4 border-b border-primary/10 pb-2">
                  <h3 className="text-sm font-semibold text-primary">{t("megaMenu.featuredServices")}</h3>
                </div>
                <div className="grid gap-4">
                  {featuredServices.map((service, index) => (
                    <Link
                      key={index}
                      href={service.href}
                      className="group flex flex-col gap-2 rounded-lg p-3 transition-all duration-200 hover:bg-white/50"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm group-hover:shadow-md transition-all duration-200">
                        {service.icon}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.title}</p>
                        <p className="text-xs text-gray-600">{service.description}</p>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/90 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("megaMenu.viewAllServices")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

