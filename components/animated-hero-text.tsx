/* eslint-disable */
"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AnimatedHeroTextProps {
  text: string
}

{/*animate={isHovered ? {
color: ['#FFFFFF', '#F98F1F', '#FFFFFF'],
transition: {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse',
  delay: (index * word.length + charIndex) * 0.02
}
} : {}}*/}

const AnimatedHeroText: React.FC<AnimatedHeroTextProps> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  const words = text.split(' ')

  return (
    <motion.div
      ref={containerRef}
      className="relative inline-block"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2 relative"
          animate={isHovered ? {
            y: -5,
            transition: { duration: 0.2, delay: index * 0.05 }
          } : {}}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              animate={isHovered ? {
                color: ['#FFFFFF', '#F98F1F', '#FFFFFF'],
                transition: {
                  duration: 0.5,
                  repeatType: 'reverse',
                  delay: (index * word.length + charIndex) * 0.02
                }
              } : {}}
            >
              {char}
            </motion.span>
          ))}
          {isHovered && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            />
          )}
        </motion.span>
      ))}
      {isHovered && (
        <motion.div
          className="absolute w-10 h-10 rounded-full bg-white/10 pointer-events-none"
          style={{
            left: mousePosition.x - 20,
            top: mousePosition.y - 20,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      )}
    </motion.div>
  )
}

export default AnimatedHeroText