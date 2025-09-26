"use client"

import SupportHero from "@/components/support-hero"
import SupportCategories from "@/components/support-categories"
import SupportContact from "@/components/support-contact"
{/*import SupportOptions from "@/components/support-options"*/}
import Navigation from "@/components/nav"
import Footer from "@/components/footer"

export default function SupportPage() {
  return (
    <>
      <Navigation page="support" />
      <main className="min-h-screen bg-white">
        <SupportHero />
        <SupportCategories />
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
