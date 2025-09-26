import ProductFocusedHero from "@/components/product-focused-hero"
import SupportCategories from "@/components/support-categories"
import SupportContact from "@/components/support-contact"
{/*import SupportOptions from "@/components/support-options"*/}
import Navigation from "@/components/nav"
import Footer from "@/components/footer"

export default function AlternativeSupportPage() {
  return (
    <>
      <Navigation page="alternative" />
      <main className="min-h-screen bg-white">
        <ProductFocusedHero />
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
