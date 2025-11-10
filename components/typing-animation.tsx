"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"

interface TypingAnimationProps {
  text: string
  onComplete: () => void
}

export function TypingAnimation({ text, onComplete }: TypingAnimationProps) {
  const characters = text.split("")

  useEffect(() => {
    const timeout = setTimeout(() => {
      onComplete()
    }, characters.length * 100 + 500) // Delay after typing finishes

    return () => clearTimeout(timeout)
  }, [characters.length, onComplete])

  return (
    <motion.div className="flex items-center justify-center text-8xl font-bold">
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.1,
            ease: "easeOut",
          }}
          className={char === "C" ? "text-[#CD7F32]" : "text-gray-800"}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}