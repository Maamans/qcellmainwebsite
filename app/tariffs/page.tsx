"use client"

import TariffsHero from "@/components/tariffs-hero"
import TariffNavigation from "@/components/tariff-navigation"
import ComboBundles from "@/components/combo-bundles"
import Navigation from "@/components/nav"
import { useEffect } from "react"

export default function TariffsPage() {
  useEffect(() => {
    document.title = "Combo Bundles | Tariffs | qcell"
    document.querySelector("meta[name='keywords']")?.setAttribute("content", "combo bundles, qcell, tariffs, mobile plans, affordable combo, combo packages")
    document.querySelector("meta[name='description']")?.setAttribute("content", "Explore our combo bundles designed for your needs. Enjoy affordable combo plans with qcell.")
  }, [])

  return (
    <>
    <Navigation page="tariffs"/>
    <main className="min-h-screen bg-white">
      <TariffsHero />
      <TariffNavigation activeTab="Combo Bundles" />
      <ComboBundles />
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
