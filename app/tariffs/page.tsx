"use client"

import TariffsHero from "@/components/tariffs-hero"
import TariffNavigation from "@/components/tariff-navigation"
import Navigation from "@/components/nav"
import Footer from "@/components/footer"
import VoiceTariffs from "@/components/voice-tariffs"
import { useEffect } from "react"

export default function TariffsPage() {
  useEffect(() => {
    document.title = "Tariffs | qcell"
    document.querySelector("meta[name='keywords']")?.setAttribute("content", "tariffs, qcell, voice calls, mobile plans, affordable, packages")
    document.querySelector("meta[name='description']")?.setAttribute("content", "Explore our tariff plans designed for your needs. Enjoy affordable voice and data plans with qcell.")
  }, [])

  return (
    <>
      <Navigation page="tariffs"/>
      <main className="min-h-screen bg-white">
        <TariffsHero />
        {/* Set Voice Tariffs as the default tab so content always shows */}
        <TariffNavigation activeTab="Voice Tariffs" />
        {/* Show VoiceTariffs content by default */}
        <VoiceTariffs />
      </main>
      <Footer />
    </>
  )
}
