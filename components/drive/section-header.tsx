"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  currentSection: string
}

export function SectionHeader({ currentSection }: SectionHeaderProps) {
  return (
    <>
    <motion.div
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >

      <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full">
        <div className="flex space-x-8 text-white/80 font-medium">
          <motion.div className={`relative px-2 ${currentSection === "mission" ? "text-white" : "text-white/50"}`}>
            Mission
            {currentSection === "mission" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                layoutId="activeSection"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>

          <motion.div className={`relative px-2 ${currentSection === "vision" ? "text-white" : "text-white/50"}`}>
            Vision
            {currentSection === "vision" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                layoutId="activeSection"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>

          <motion.div className={`relative px-2 ${currentSection === "values" ? "text-white" : "text-white/50"}`}>
            Values
            {currentSection === "values" && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
                layoutId="activeSection"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>

    
    </>
  )
}
