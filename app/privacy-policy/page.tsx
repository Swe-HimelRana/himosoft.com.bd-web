"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { AnimatedSection } from "../animations"
import { useLanguage } from "../contexts/language-context"

export default function PrivacyPolicy() {
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-gray-900">{t("privacy.title")}</h1>
            <div className="prose prose-green max-w-none">
              <p className="text-muted-foreground">{t("legal.lastUpdated")}</p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Introduction</h2>
              <p>At HimoSoft ('we,' 'our,' or 'us'), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Information We Collect</h2>
              <p>We may collect information about you in a variety of ways, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, and other contact information you
                  provide when filling out forms on our website.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you use our website, including IP address, browser
                  type, pages visited, and time spent on the site.
                </li>
                <li>
                  <strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies
                  to track activity on our website and hold certain information.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. How We Use Your Information</h2>
              <p>We may use the information we collect about you for various purposes, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Providing, maintaining, and improving our services</li>
                <li>Responding to your inquiries and fulfilling your requests</li>
                <li>Sending administrative information, such as updates or changes to our terms and policies</li>
                <li>Personalizing your experience on our website</li>
                <li>Analyzing usage patterns to improve our website and services</li>
                <li>Protecting against fraudulent or illegal activity</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Disclosure of Your Information</h2>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party vendors who
                  provide services on our behalf.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or a
                  portion of our assets, your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or
                  in response to valid requests by public authorities.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Your Privacy Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as the
                right to access, correct, or delete your data. To exercise these rights, please contact us using the
                information provided at the end of this policy.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information.
                However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot
                guarantee absolute security.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900">8. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">
                <strong>Email:</strong> privacy@himosoft.com.bd
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

