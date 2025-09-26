"use client"

import TariffsHero from "@/components/tariffs-hero"
import TariffNavigation from "@/components/tariff-navigation"
import DataBundles from "@/components/data-bundles"
import Navigation from "@/components/nav"
import { useEffect } from "react"

export default function DataBundlesPage() {
  useEffect(() => {
    document.title = "Data Bundles | Tariffs | qcell"
    document.querySelector("meta[name='keywords']")?.setAttribute("content", "data bundles, qcell, tariffs, mobile data, internet plans, affordable data, data packages")
    document.querySelector("meta[name='description']")?.setAttribute("content", "Discover our data bundles tailored for your needs. Enjoy seamless connectivity with qcell's affordable data plans.")
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
    <Navigation page="data bundles"/>
    <main className="min-h-screen bg-white">
      <TariffsHero />
      <TariffNavigation activeTab="Data Bundles" />
      <DataBundles />
    </main>
    </>
  )
}
