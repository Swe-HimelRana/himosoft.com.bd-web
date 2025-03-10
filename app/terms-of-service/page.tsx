"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { AnimatedSection } from "../animations"
import { useLanguage } from "../contexts/language-context"

export default function TermsOfService() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("legal.backToHome")}
            </Link>
          </div>

          <AnimatedSection>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">{t("terms.title")}</h1>
            <div className="prose prose-green max-w-none">
              <p className="text-muted-foreground">{t("legal.lastUpdated")}</p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Acceptance of Terms</h2>
              <p>By accessing or using the HimoSoft website and services, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our website or services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Description of Services</h2>
              <p>
                HimoSoft provides software development services, including but not limited to custom software
                development, web development, mobile app development, and other related services as described on our
                website.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. User Accounts</h2>
              <p>
                Some of our services may require you to create an account. You are responsible for maintaining the
                confidentiality of your account information and for all activities that occur under your account. You
                agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Intellectual Property</h2>
              <p>
                All content on the HimoSoft website, including text, graphics, logos, images, and software, is the
                property of HimoSoft or its content suppliers and is protected by copyright and other intellectual
                property laws.
              </p>
              <p className="mt-2">
                For custom software development projects, ownership of intellectual property will be governed by the
                specific agreement between HimoSoft and the client.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. User Conduct</h2>
              <p>You agree not to use our website or services to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on the rights of others</li>
                <li>
                  Transmit any material that is unlawful, harmful, threatening, abusive, or otherwise objectionable
                </li>
                <li>Interfere with or disrupt the operation of our website or services</li>
                <li>Attempt to gain unauthorized access to our systems or user accounts</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Payment Terms</h2>
              <p>
                Payment terms for our services will be specified in the agreement between HimoSoft and the client.
                Unless otherwise stated, all fees are non-refundable.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">7. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, HimoSoft shall not be liable for any indirect, incidental,
                special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred
                directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from
                your access to or use of or inability to access or use our services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">8. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless HimoSoft and its officers, directors, employees, and agents
                from any claims, liabilities, damages, losses, and expenses, including reasonable legal fees, arising
                out of or in any way connected with your access to or use of our services or your violation of these
                Terms of Service.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">9. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. We will notify users of any
                significant changes by posting a notice on our website. Your continued use of our services after such
                modifications constitutes your acceptance of the revised terms.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">10. Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of the State of
                California, without regard to its conflict of law provisions.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">11. Contact Information</h2>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p className="mt-2">
                <strong>Email:</strong> legal@himosoft.com.bd
                <br />
                <strong>Phone:</strong> +8801870955054 or +8801315770487
                <br />
                <strong>Address:</strong> Tapir Bari, Sreepur, Gazipur, Tengra-1740
              </p>
            </div>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  )
}

