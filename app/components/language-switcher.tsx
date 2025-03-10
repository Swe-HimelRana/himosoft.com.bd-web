"use client"

import { useState } from "react"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage, type Language } from "../contexts/language-context"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  isScrolled?: boolean
}

export function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)

  const languages = [
    { code: "bn", name: t("language.bangla") },
    { code: "en", name: t("language.english") },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "flex text-gray-600 hover:text-primary items-center gap-1 px-2 py-1 text-sm font-medium rounded-md transition-all duration-300",
          )}
        >
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{language === "bn" ? "English" : "বাংলা"}</span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={cn(
              "flex items-center gap-2 cursor-pointer",
              language === lang.code && "bg-primary/10 text-primary",
            )}
            onClick={() => {
              setLanguage(lang.code as Language)
              setOpen(false)
            }}
          >
            {language === lang.code && <Check className="h-4 w-4" />}
            <span className={language !== lang.code ? "pl-6" : ""}>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

