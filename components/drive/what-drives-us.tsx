"use client"

import { useRef, useState, useEffect } from "react"
import { useScroll, useTransform, useSpring } from "framer-motion"
import { SectionHeader } from "./section-header"
import { MissionSection } from "./mission-section"
import { VisionSection } from "./vision-section"
import { ValuesSection } from "./values-section"
import useMobile from "@/hooks/use-mobile"

export default function WhatDrivesUs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState("mission")
  const isMobile = useMobile()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20,
    stiffness: 100,
  })

  // Transform scroll progress to section progress
  const missionProgress = useTransform(smoothProgress, [0, 0.3], [0, 1])
  const visionProgress = useTransform(smoothProgress, [0.3, 0.6], [0, 1])
  const valuesProgress = useTransform(smoothProgress, [0.6, 0.9], [0, 1])

  // Determine active section based on scroll position
  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((value) => {
      if (value < 0.3) {
        setCurrentSection("mission")
      } else if (value < 0.6) {
        setCurrentSection("vision")
      } else {
        setCurrentSection("values")
      }
    })

    return () => unsubscribe()
  }, [smoothProgress])

  return (
    <>
    <div ref={containerRef} className="relative h-[300vh] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <SectionHeader currentSection={currentSection} />

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="relative h-full w-full">
          <MissionSection progress={missionProgress} isMobile={isMobile} />
          <VisionSection progress={visionProgress} isMobile={isMobile} />
          <ValuesSection progress={valuesProgress} isMobile={isMobile} />
        </div>
      </div>
    </div>
    </>
  )
}
