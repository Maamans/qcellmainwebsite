"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Target, Eye, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItemProps {
  title: string
  content: string
  icon: React.ReactNode
  isOpen: boolean
  onClick: () => void
}

const AccordionItem = ({ title, content, icon, isOpen, onClick }: AccordionItemProps) => {
  return (
    <motion.div
      layout
      className={cn(
        "mb-4 overflow-hidden rounded-lg border transition-all duration-200",
        isOpen ? "border-primary bg-primary/5" : "border-border",
      )}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            {icon}
          </div>
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="pl-[52px]"
              >
                <p className="text-muted-foreground">{content}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function VerticalAccordion() {
  const [openIndex, setOpenIndex] = useState<number>(0)

  const items = [
    {
      title: "Our Mission",
      content:
        "We strive to create innovative solutions that empower businesses and individuals to achieve their goals. Through dedication to excellence and customer satisfaction, we aim to make a positive impact on the world.",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Our Vision",
      content:
        "To become the leading provider of transformative solutions that drive growth and success. We envision a future where our technology enables seamless experiences and unlocks new possibilities for our clients.",
      icon: <Eye className="h-5 w-5" />,
    },
    {
      title: "Our Values",
      content:
        "Integrity, innovation, collaboration, and customer focus form the foundation of everything we do. We believe in fostering a culture of respect, continuous learning, and commitment to excellence.",
      icon: <Heart className="h-5 w-5" />,
    },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div layout className="space-y-2">
        {items.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            icon={item.icon}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          />
        ))}
      </motion.div>
    </div>
  )
}
