"use client"

import TariffsHero from "@/components/tariffs-hero"
import TariffNavigation from "@/components/tariff-navigation"
import VoiceTariffs from "@/components/voice-tariffs"
import Navigation from "@/components/nav"
import { useEffect } from "react"

export default function VoiceTariffsPage() {
  useEffect(() => {
    // Set the document title and meta tags for SEO
    document.title = "Voice Tariffs | Tariffs | qcell"
    document.querySelector("meta[name='keywords']")?.setAttribute("content", "voice tariffs, qcell, mobile plans, affordable voice, voice packages")
    document.querySelector("meta[name='description']")?.setAttribute("content", "Explore our voice tariffs designed for your needs. Enjoy affordable voice plans with qcell.")
  }, [])


  // Scroll to a specific position after a delay
  useEffect(() => {
      const scrollToPosition = () => {
          const targetPosition = window.innerHeight * 0.4;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          const duration = 500; // duration in ms
          let startTime: number | null = null;

          const easeInOutQuad = (t: number) => {
              return t < 0.5
                  ? 2 * t * t
                  : -1 + (4 - 2 * t) * t;
          };

          const animation = (currentTime: number) => {
              if (startTime === null) startTime = currentTime;
              const timeElapsed = currentTime - startTime;
              const progress = Math.min(timeElapsed / duration, 1);
              const ease = easeInOutQuad(progress);

              window.scrollTo(0, startPosition + distance * ease);

              if (timeElapsed < duration) {
                  requestAnimationFrame(animation);
              }
          };

          requestAnimationFrame(animation);
      };

      setTimeout(() => {
        scrollToPosition();
      }, 3000); // Delay before scrolling to the target position
  }, []);
  return (
    <>
    <Navigation page="voice tariffs"/>
    
    <main className="min-h-screen bg-white">
      <TariffsHero />
      <TariffNavigation activeTab="Voice Tariffs" />
      <VoiceTariffs />
    </main>
    </>
  )
}
