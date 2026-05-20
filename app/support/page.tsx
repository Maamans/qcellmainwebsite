"use client"

import SupportHero from "@/components/support-hero"
import SupportCategories from "@/components/support-categories"
import SupportFAQ from "@/components/support-faq"
import SupportContact from "@/components/support-contact"
{/*import SupportOptions from "@/components/support-options"*/}
import Navigation from "@/components/navigation-two"
import Footer from "@/components/footer"

export default function SupportPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <SupportHero />
        <SupportCategories />
        <SupportFAQ />
        <SupportContact />
        {/*<SupportOptions />*/}
        <Footer />
      </main>
      {typeof window !== "undefined" && (
      <div
          className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all"
          style={{ height: `${document.body.scrollHeight}px` }}
      ></div>
      )}
    </>
  )
}
