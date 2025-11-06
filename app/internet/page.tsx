"use client"


import Image from "next/image"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Navigation from "@/components/nav" 
import Footer from "@/components/footer"

export default function CareersPage() {

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 })

  // Listen for fullscreen change events

  // set the document title
  useEffect(() => {
    document.title = 'Careers at Qcell'
  }, [])

  return (
    <>
      {/* Navigation */}
      <Navigation page="Ineternt"/>
      <header className="min-h-screen text-white">
        {/* Hero Content */}
        <div className="relative z-40 min-h-screen">
            <Image src={"/images/qcell-network-two.png"} alt="Careers at Qcell" fill className="absolute inset-0 w-full h-full object-center" />
            {/* Removed dark overlay */}
          {/* Content */}
          <div ref={sectionRef} className="relative z-10 flex min-h-screen flex-col justify-center items-center px-6 py-24 md:px-12">
            <div className="relative flex flex-col items-center justify-center text-center md:mt-20 md:items-start md:text-left">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-3 text-5xl text-white text-center "
              >
                Speed. Freedom. Connection.
              </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8 mx-auto max-w-2xl text-lg text-white text-center md:text-xl"
            >
                Unlock your world with powerful internet — anytime, anywhere.
            </motion.p>
            {/*<motion.button ...>View Plans</motion.button>*/}
            <motion.div
                className="mx-auto absolute cursor-pointer -bottom-10 left-[37%] md:left-[45%] text-white text-sm flex flex-col items-center"
                animate={isInView ? { y: [0, 10, 0], opacity: 1 } : { y: [0, 0, 0], opacity: 0}}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            >
                <p className="mb-2 opacity-70">View Plans</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 5L12 19M12 19L19 12M12 19L5 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                </svg>
            </motion.div>
            </div>
          </div>          
        </div>        
      </header>
      <main>
      </main>
      <Footer />
    </>

    
  )
}
