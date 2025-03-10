"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define available languages
export type Language = "bn" | "en"

// Define context type
type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "bn",
  setLanguage: () => {},
  t: (key: string) => key,
})

// Dictionary of translations
// Note: This is a simplified example. In a real application, you would have a more comprehensive dictionary
// or use a translation management system.
const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": {
    bn: "হোম",
    en: "Home",
  },
  "nav.services": {
    bn: "সেবাসমূহ",
    en: "Services",
  },
  "nav.about": {
    bn: "আমাদের সম্পর্কে",
    en: "About",
  },
  "nav.team": {
    bn: "টিম",
    en: "Team",
  },
  "nav.getStarted": {
    bn: "শুরু করুন",
    en: "Get Started",
  },
  "nav.contactUs":{
    bn: "যোগাযোগ করুন",
    en: "Contact Us",
  },

  // Hero Section
  "hero.innovativeSolutions": {
    bn: "উদ্ভাবনী সমাধান",
    en: "Innovative Solutions",
  },
  "hero.transformingIdeas": {
    bn: "আপনার ধারণাকে রূপান্তর করুন",
    en: "Transforming Ideas Into",
  },
  "hero.digitalReality": {
    bn: "ডিজিটাল বাস্তবতায়",
    en: "Digital Reality",
  },
  "hero.description": {
    bn: "হিমোসফ্ট আপনার ব্যবসাকে ডিজিটাল বিশ্বে সফল হতে সাহায্য করার জন্য অত্যাধুনিক সফটওয়্যার ডেভেলপমেন্ট সেবা প্রদান করে।",
    en: "HimoSoft delivers cutting-edge software development services to help your business thrive in the digital world.",
  },
  "hero.getStarted": {
    bn: "শুরু করুন",
    en: "Get Started",
  },
  "hero.learnMore": {
    bn: "আরও জানুন",
    en: "Learn More",
  },

  // Services Section
  "services.title": {
    bn: "সেবাসমূহ",
    en: "Services",
  },
  "services.whatWeOffer": {
    bn: "আমরা যা অফার করি",
    en: "What We Offer",
  },
  "services.description": {
    bn: "আপনার ব্যবসার চাহিদা পূরণের জন্য আমাদের থেকে সফটওয়্যার ডেভেলপমেন্ট সেবা নিতে পারেন।",
    en: "Our comprehensive range of software development services to meet your business needs.",
  },
  "services.customSoftware": {
    bn: "আপনার কল্পনার মতো করে সফটওয়্যার",
    en: "Custom Software",
  },
  "services.customSoftwareDesc": {
    bn: "আপনার নির্দিষ্ট ব্যবসায়িক চ্যালেঞ্জ এবং প্রয়োজনীয়তা মোকাবেলা করার জন্য ডিজাইন করা সফটওয়্যার সমাধান।",
    en: "Tailored software solutions designed to address your specific business challenges and requirements.",
  },
  "services.webDevelopment": {
    bn: "ওয়েব ডেভেলপমেন্ট",
    en: "Web Development",
  },
  "services.webDevelopmentDesc": {
    bn: "সর্বশেষ প্রযুক্তি দিয়ে তৈরি রেসপন্সিভ, ব্যবহারকারী-বান্ধব ওয়েবসাইট এবং ওয়েব অ্যাপ্লিকেশন।",
    en: "Responsive, user-friendly websites and web applications built with the latest technologies.",
  },
  "services.mobileApps": {
    bn: "মোবাইল অ্যাপস",
    en: "Mobile Apps",
  },
  "services.mobileAppsDesc": {
    bn: "iOS এবং Android ডিভাইসের জন্য নেটিভ এবং ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ্লিকেশন।",
    en: "Native and cross-platform mobile applications for iOS and Android devices.",
  },
  "services.databaseSolutions": {
    bn: "ডাটাবেস সমাধান",
    en: "Database Solutions",
  },
  "services.databaseSolutionsDesc": {
    bn: "উন্নত পারফরম্যান্সের জন্য দক্ষ ডাটাবেস ডিজাইন, ডেভেলপমেন্ট এবং অপটিমাইজেশন।",
    en: "Efficient database design, development, and optimization for improved performance.",
  },
  "services.apiIntegration": {
    bn: "এপিআই ইন্টিগ্রেশন",
    en: "API Integration",
  },
  "services.apiIntegrationDesc": {
    bn: "আপনার সফটওয়্যার ক্ষমতা বাড়াতে তৃতীয় পক্ষের সেবা এবং এপিআইগুলির সাথে সহজ ইন্টিগ্রেশন।",
    en: "Seamless integration with third-party services and APIs to extend your software capabilities.",
  },
  "services.supportMaintenance": {
    bn: "সাপোর্ট এবং রক্ষণাবেক্ষণ",
    en: "Support & Maintenance",
  },
  "services.supportMaintenanceDesc": {
    bn: "আপনার সফটওয়্যার সুচারুভাবে চলতে নিশ্চিত করার জন্য চলমান প্রযুক্তিগত সহায়তা এবং রক্ষণাবেক্ষণ।",
    en: "Ongoing technical support and maintenance to ensure your software runs smoothly.",
  },

  // Mega Menu
  "megaMenu.serviceCategories": {
    bn: "সেবা বিভাগসমূহ",
    en: "Service Categories",
  },
  "megaMenu.featuredServices": {
    bn: "বিশেষ সেবাসমূহ",
    en: "Featured Services",
  },
  "megaMenu.viewAllServices": {
    bn: "সকল সেবা দেখুন",
    en: "View All Services",
  },
  "megaMenu.corporateSoftware": {
    bn: "কর্পোরেট সফটওয়্যার ডেভেলপমেন্ট",
    en: "Corporate Software Development",
  },
  "megaMenu.corporateSoftwareDesc": {
    bn: "আপনার ব্যবসার চাহিদা অনুযায়ী কাস্টম এন্টারপ্রাইজ সমাধান",
    en: "Custom enterprise solutions tailored to your business needs",
  },
  "megaMenu.smartSchool": {
    bn: "স্মার্ট স্কুল",
    en: "Smart School",
  },
  "megaMenu.smartSchoolDesc": {
    bn: "সম্পূর্ণ স্কুল ম্যানেজমেন্ট সিস্টেম",
    en: "Comprehensive school management systems",
  },
  "megaMenu.smartUnion": {
    bn: "স্মার্ট ইউনিয়ন",
    en: "Smart Union",
  },
  "megaMenu.smartUnionDesc": {
    bn: "ইউনিয়ন এবং সংগঠনের জন্য ডিজিটাল সমাধান",
    en: "Digital solutions for unions and organizations",
  },
  "megaMenu.smsService": {
    bn: "এসএমএস সেবা",
    en: "SMS Service",
  },
  "megaMenu.smsServiceDesc": {
    bn: "ব্যবসার জন্য বাল্ক মেসেজিং সমাধান",
    en: "Bulk messaging solutions for businesses",
  },
  "megaMenu.serverHosting": {
    bn: "অপটিমাইজড ম্যানেজড সার্ভার হোস্টিং",
    en: "Optimize Managed Server Hosting",
  },
  "megaMenu.serverHostingDesc": {
    bn: "বিশেষজ্ঞ ম্যানেজমেন্ট সহ উচ্চ-কর্মক্ষমতা হোস্টিং",
    en: "High-performance hosting with expert management",
  },
  "megaMenu.professionalEmail": {
    bn: "প্রফেশনাল ইমেইল",
    en: "Professional Email",
  },
  "megaMenu.professionalEmailDesc": {
    bn: "আপনার ডোমেইন সহ ব্যবসায়িক ইমেইল সমাধান",
    en: "Business email solutions with your domain",
  },
  "megaMenu.domainRegistration": {
    bn: "ব্যবসায়িক ডোমেইন রেজিস্ট্রেশন",
    en: "Business Domain Registration",
  },
  "megaMenu.domainRegistrationDesc": {
    bn: "কাস্টম ডোমেইন সহ আপনার অনলাইন পরিচয় নিশ্চিত করুন",
    en: "Secure your online identity with custom domains",
  },
  "megaMenu.customSoftware": {
    bn: "কাস্টম সফটওয়্যার",
    en: "Custom Software",
  },
  "megaMenu.customSoftwareDesc": {
    bn: "আপনার ব্যবসার জন্য উপযুক্ত সমাধান",
    en: "Tailored solutions for your business",
  },
  "megaMenu.databaseSolutions": {
    bn: "ডাটাবেস সমাধান",
    en: "Database Solutions",
  },
  "megaMenu.databaseSolutionsDesc": {
    bn: "দক্ষ ডাটা ম্যানেজমেন্ট সিস্টেম",
    en: "Efficient data management systems",
  },
  "megaMenu.mobileApps": {
    bn: "মোবাইল অ্যাপস",
    en: "Mobile Apps",
  },
  "megaMenu.mobileAppsDesc": {
    bn: "iOS এবং Android অ্যাপ্লিকেশন",
    en: "iOS and Android applications",
  },

  // About Section
  "about.title": {
    bn: "আমাদের সম্পর্কে",
    en: "About Us",
  },
  "about.ourStory": {
    bn: "আমাদের সম্পর্কে",
    en: "Our Story",
  },
  "about.description1": {
    bn: "২০২০ সালে প্রতিষ্ঠিত, HimoSoft সফটওয়্যার প্রতিষ্ঠান হিসেবে ব্যবসায়িক প্রতিষ্ঠানগুলোর ডিজিটাল উপস্থিতি ও কার্যক্রমের রূপান্তরে গুরুত্বপূর্ণ ভূমিকা রেখে চলেছে।",
    en: "Founded in 2020, HimoSoft has been at the forefront of software innovation, helping businesses transform their digital presence and operations.",
  },
  "about.description2": {
    bn: "আমাদের অভিজ্ঞ ডেভেলপার, ডিজাইনার এবং প্রজেক্ট ম্যানেজারদের দল সহযোগিতামূলকভাবে কাজ করে ব্যবসার বৃদ্ধি এবং দক্ষতা চালিত করে এমন উচ্চ-মানের সফটওয়্যার সমাধান সরবরাহ করে।",
    en: "Our team of experienced developers, designers, and project managers work collaboratively to deliver high-quality software solutions that drive business growth and efficiency.",
  },
  "about.description3": {
    bn: "ক্লায়েন্ট-কেন্দ্রিক পদ্ধতির সাথে, আমরা আপনার অনন্য চ্যালেঞ্জ এবং লক্ষ্যগুলি বোঝার উপর ফোকাস করি যাতে প্রত্যাশা ছাড়িয়ে যায় এমন কাস্টমাইজড সমাধান তৈরি করা যায়।",
    en: "With a client-centric approach, we focus on understanding your unique challenges and goals to create customized solutions that exceed expectations.",
  },

  // Team Section
  "team.title": {
    bn: "আমাদের টিম",
    en: "Our Team",
  },
  "team.meetOurExperts": {
    bn: "আমাদের বিশেষজ্ঞদের সাথে পরিচিত হোন",
    en: "Meet Our Experts",
  },
  "team.description": {
    bn: "হিমোসফ্টের সাফল্যের পিছনে থাকা প্রতিভাবান পেশাদাররা।",
    en: "The talented professionals behind HimoSoft's success.",
  },
  "team.directorFounder": {
    bn: "পরিচালক এবং প্রতিষ্ঠাতা",
    en: "Director & Founder",
  },
  "team.dev": {
    bn: "প্রোগ্রামার",
    en: "Developer",
  },
  "team.leadDeveloper": {
    bn: "লিড ডেভেলপার",
    en: "Lead Developer",
  },

  // Footer
  "footer.quickLinks": {
    bn: "দ্রুত লিঙ্ক",
    en: "Quick Links",
  },
  "footer.getInTouch": {
    bn: "যোগাযোগ করুন",
    en: "Get in Touch",
  },
  "footer.termsOfService": {
    bn: "সেবার শর্তাবলী",
    en: "Terms of Service",
  },
  "footer.privacyPolicy": {
    bn: "গোপনীয়তা নীতি",
    en: "Privacy Policy",
  },
  "footer.copyright": {
    bn: "© ২০২৫ হিমোসফ্ট। সর্বস্বত্ব সংরক্ষিত।",
    en: "© 2025 HimoSoft. All rights reserved.",
  },
  "footer.description": {
    bn: "হিমোসফ্ট আপনার ব্যবসাকে ডিজিটাল বিশ্বে সফল হতে সাহায্য করার জন্য অত্যাধুনিক সফটওয়্যার ডেভেলপমেন্ট সেবা প্রদান করে।",
    en: "Delivering cutting-edge software development services to help your business thrive in the digital world.",
  },

  // Language Switcher
  "language.english": {
    bn: "English",
    en: "English",
  },
  "language.bangla": {
    bn: "বাংলা",
    en: "Bangla",
  },
  "language.select": {
    bn: "ভাষা নির্বাচন করুন",
    en: "Select Language",
  },

  // Terms and Privacy Pages
  "legal.lastUpdated": {
    bn: "সর্বশেষ আপডেট: ফেব্রুয়ারী ২, ২০২৩",
    en: "Last Updated: February 2, 2023",
  },
  "legal.backToHome": {
    bn: "হোমে ফিরে যান",
    en: "Back to Home",
  },
  "terms.title": {
    bn: "সেবার শর্তাবলী",
    en: "Terms of Service",
  },
  "terms.acceptance": {
    bn: "১. শর্তাবলী গ্রহণ",
    en: "1. Acceptance of Terms",
  },
  "terms.acceptanceDesc": {
    bn: "হিমোসফ্ট ওয়েবসাইট এবং সেবাগুলি অ্যাক্সেস বা ব্যবহার করে, আপনি এই সেবার শর্তাবলী দ্বারা আবদ্ধ হতে সম্মত হন। যদি আপনি এই শর্তাবলীতে সম্মত না হন, তাহলে অনুগ্রহ করে আমাদের ওয়েবসাইট বা সেবাগুলি ব্যবহার করবেন না।",
    en: "By accessing or using the HimoSoft website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.",
  },
  "privacy.title": {
    bn: "গোপনীয়তা নীতি",
    en: "Privacy Policy",
  },
  "privacy.introduction": {
    bn: "১. ভূমিকা",
    en: "1. Introduction",
  },
  "privacy.introductionDesc": {
    bn: "হিমোসফ্ট ('আমরা,' 'আমাদের,' বা 'আমাদেরকে') এ, আমরা আপনার গোপনীয়তা সম্মান করি এবং আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখতে প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতি ব্যাখ্যা করে কিভাবে আমরা আপনার তথ্য সংগ্রহ, ব্যবহার, প্রকাশ এবং সুরক্ষিত করি যখন আপনি আমাদের ওয়েবসাইট পরিদর্শন করেন বা আমাদের সেবাগুলি ব্যবহার করেন।",
    en: "At HimoSoft ('we,' 'our,' or 'us'), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.",
  },
}

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with Bangla as default
  const [language, setLanguage] = useState<Language>("bn")

  // Load language preference from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "bn" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Export the translations for direct access if needed
export { translations }

