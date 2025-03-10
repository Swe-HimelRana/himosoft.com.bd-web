"use client"

import Link from "next/link"
import { Building2, GraduationCap, Users, MessageSquare, Server, Mail, Globe, ArrowRight } from "lucide-react"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { AnimatedSection } from "../animations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "../contexts/language-context"

export default function ServicesPage() {
  const { t } = useLanguage()

  // Main service categories
  const mainServices = [
    {
      icon: <Building2 className="h-10 w-10 text-primary" />,
      title: "Corporate Software Development",
      description:
        "Custom enterprise solutions tailored to your business needs, from workflow automation to comprehensive management systems.",
      href: "/services/corporate-software",
      image:
        "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: "Smart School",
      description:
        "Comprehensive school management systems including student information, attendance tracking, grade management, and parent communication.",
      href: "/services/smart-school",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Smart Union",
      description:
        "Digital solutions for unions and organizations to manage membership, communications, events, and voting processes.",
      href: "/services/smart-union",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "SMS Service",
      description:
        "Bulk messaging solutions for businesses to reach customers, employees, or members with important updates and notifications.",
      href: "/services/sms-service",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      icon: <Server className="h-10 w-10 text-primary" />,
      title: "Optimize Managed Server Hosting",
      description:
        "High-performance hosting with expert management, security monitoring, and regular maintenance for optimal uptime.",
      href: "/services/server-hosting",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      icon: <Mail className="h-10 w-10 text-primary" />,
      title: "Professional Email",
      description:
        "Business email solutions with your domain, including spam protection, large storage, and seamless integration with other tools.",
      href: "/services/professional-email",
      image:
        "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Business Domain Registration",
      description:
        "Secure your online identity with custom domains, including domain management, DNS configuration, and renewal services.",
      href: "/services/domain-registration",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full pt-24 pb-12 md:pt-32 md:pb-24 bg-gradient-to-b from-primary/5 to-primary/10">
          <div className="container px-4 md:px-6 mx-auto">
            <AnimatedSection className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">
                {t("services.title")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">{t("services.description")}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white">{t("hero.getStarted")}</Button>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
                  {t("hero.learnMore")}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Main Services Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <AnimatedSection className="mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("services.whatWeOffer")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t("services.description")}</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainServices.map((service, index) => (
                <AnimatedSection key={index} delay={index * 100} className="h-full">
                  <Card className="h-full group overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader className="flex flex-row items-start gap-4 pb-2">
                      <div className="rounded-full bg-primary/10 p-3 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                        {service.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground mb-4">
                        {service.description}
                      </CardDescription>
                      <Link
                        href={service.href}
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {t("hero.learnMore")}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6 mx-auto">
            <AnimatedSection className="mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Development Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow a structured approach to ensure your project is delivered on time and exceeds expectations
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Discovery",
                  description: "We start by understanding your business needs, goals, and challenges.",
                },
                {
                  step: "02",
                  title: "Planning",
                  description: "We create a detailed roadmap with timelines, milestones, and deliverables.",
                },
                {
                  step: "03",
                  title: "Development",
                  description: "Our expert team builds your solution using the latest technologies and best practices.",
                },
                {
                  step: "04",
                  title: "Delivery & Support",
                  description: "We deploy your solution and provide ongoing support and maintenance.",
                },
              ].map((step, index) => (
                <AnimatedSection key={index} delay={index * 150} className="relative">
                  <div className="bg-white rounded-lg p-6 shadow-md relative z-10 h-full border border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{step.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-0">
                      <ArrowRight className="h-8 w-8 text-primary/30" />
                    </div>
                  )}
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container px-4 md:px-6 mx-auto">
            <AnimatedSection className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how our services can help you achieve your goals and drive growth
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white">{t("hero.getStarted")}</Button>
                <Button variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary">
                  {t("hero.learnMore")}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

