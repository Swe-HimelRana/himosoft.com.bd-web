"use client"

import { ArrowRight, Code, Database, Globe, LayoutGrid, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedSection, FloatingElement, PulseElement } from "./animations"
import { HeroClipPath } from "./components/hero-clippath"
import { WaveDivider } from "./components/wave-divider"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { useLanguage } from "./contexts/language-context"

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section
          id="home"
          className="w-full pt-24 pb-12 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 xl:pt-48 xl:pb-48 overflow-hidden relative"
        >
          <HeroClipPath />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-white/80 backdrop-blur-sm px-3 py-1 text-sm text-primary font-medium shadow-sm">
                    {t("hero.innovativeSolutions")}
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter leading-relaxed sm:text-5xl xl:text-6xl/none text-gray-900">
                    {t("hero.transformingIdeas")} <span className="text-primary">{t("hero.digitalReality")}</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl backdrop-blur-sm bg-white/30 p-2 rounded-md">
                    {t("hero.description")}
                  </p>
                </div>
                {/* <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    {t("hero.getStarted")}
                  </Button>
                  <Button
                    className="inline-flex h-12 items-center justify-center rounded-md border border-primary/20 bg-white/80 backdrop-blur-sm px-8 text-sm font-medium shadow-lg shadow-primary/10 transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    variant="outline"
                  >
                    {t("hero.learnMore")}
                  </Button>
                </div> */}
              </AnimatedSection>
              <AnimatedSection delay={300} className="flex items-center justify-center">
                <FloatingElement>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/60 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-gentle"></div>
                    <img
                      alt="Software development team collaborating on digital solutions"
                      className="relative rounded-xl shadow-2xl shadow-primary/20 border border-white/20 backdrop-blur-sm object-cover"
                      height="550"
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                      width="800"
                    />
                  </div>
                </FloatingElement>
              </AnimatedSection>
            </div>
          </div>
          <WaveDivider className="absolute bottom-0 left-0 w-full" />
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 relative">
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  {t("services.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("services.whatWeOffer")}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("services.description")}
                </p>
              </div>
            </AnimatedSection>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedSection delay={100}>
                <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="rounded-full bg-primary/10 p-3 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                      <Code className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl">{t("services.customSoftware")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t("services.customSoftwareDesc")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="rounded-full bg-primary/10 p-3 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                      <Globe className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl">{t("services.webDevelopment")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t("services.webDevelopmentDesc")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={300}>
                <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="rounded-full bg-primary/10 p-3 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                      <LayoutGrid className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl">{t("services.mobileApps")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t("services.mobileAppsDesc")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={400}>
                <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="rounded-full bg-primary/10 p-3 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                      <Database className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl">{t("services.databaseSolutions")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t("services.databaseSolutionsDesc")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={500}>
                <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="rounded-full bg-primary/10 p-3 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                      <ArrowRight className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl">{t("services.apiIntegration")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t("services.apiIntegrationDesc")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
              <AnimatedSection delay={600}>
                <Card className="group overflow-hidden border-primary/10 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="rounded-full bg-primary/10 p-3 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-110">
                      <Phone className="h-8 w-8 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl">{t("services.supportMaintenance")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t("services.supportMaintenanceDesc")}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 overflow-hidden relative">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <AnimatedSection className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                    {t("about.title")}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("about.ourStory")}</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t("about.description1")}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t("about.description2")}
                  </p>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    {t("about.description3")}
                  </p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={300} className="flex items-center justify-center">
                <PulseElement>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 to-primary/30 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-gentle"></div>
                    <img
                      alt="Modern office with software development team working together"
                      className="relative rounded-xl shadow-2xl shadow-primary/20 border border-white/20 object-cover"
                      height="550"
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                      width="800"
                    />
                  </div>
                </PulseElement>
              </AnimatedSection>
            </div>
          </div>
          <WaveDivider className="absolute bottom-0 left-0 w-full transform rotate-180" />
        </section>
        <section id="team" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium">
                  {t("team.title")}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("team.meetOurExperts")}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t("team.description")}
                </p>
              </div>
            </AnimatedSection>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedSection delay={100} className="flex flex-col items-center space-y-4">
                <div className="group overflow-hidden rounded-full p-1 bg-gradient-to-r from-primary to-primary/60 shadow-lg shadow-primary/20">
                  <img
                    alt="Himel - Director & Founder"
                    className="aspect-square rounded-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    height="200"
                    src="https://avatars.githubusercontent.com/u/28831625?s=400&u=5490a0b4924479bc22dab3b527d2c4fe8aeb88ed&v=4"
                    width="200"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Himel</h3>
                  <p className="text-sm text-primary">{t("team.directorFounder")}</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200} className="flex flex-col items-center space-y-4">
                <div className="group overflow-hidden rounded-full p-1 bg-gradient-to-r from-primary to-primary/60 shadow-lg shadow-primary/20">
                  <img
                    alt="Tosar Ahmed - CTO"
                    className="aspect-square rounded-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    height="200"
                    src="https://i.postimg.cc/jjWMp4HF/Screenshot-2025-03-10-094023.png"
                    width="200"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Tosar Ahmed</h3>
                  <p className="text-sm text-primary">{t("team.dev")}</p>
                </div>
              </AnimatedSection>
              <AnimatedSection delay={300} className="flex flex-col items-center space-y-4">
                <div className="group overflow-hidden rounded-full p-1 bg-gradient-to-r from-primary to-primary/60 shadow-lg shadow-primary/20">
                  <img
                    alt="Jahidul Islam - Lead Developer"
                    className="aspect-square rounded-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    height="200"
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    width="200"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Jahidul Islam</h3>
                  <p className="text-sm text-primary">{t("team.leadDeveloper")}</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

