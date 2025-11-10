"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Navigation from "@/components/nav"
import Footer from "@/components/footer"

export default function CareersPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  useEffect(() => {
    document.title = 'Careers - Qcell'
  }, [])

  const perks = [
    {
      number: "1",
      title: "Medical benefits scheme",
      description: "QCell SL for great healthcare benefits and support"
    },
    {
      number: "2", 
      title: "Staff trainings",
      description: "QCell SL for great healthcare benefits and support"
    },
    {
      number: "3",
      title: "Staff development", 
      description: "QCell SL for great healthcare benefits and support"
    },
    {
      number: "4",
      title: "Staff CUG",
      description: "QCell SL for great healthcare benefits and support"
    },
    {
      number: "5",
      title: "Staff transportation scheme",
      description: "QCell SL for great healthcare benefits and support"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <>
      <Navigation page="careers" />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/bbb.png"
            alt="QCell Careers Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-[#F98F1F]/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

      </section>

      {/* Perks Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <motion.div
            ref={containerRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F98F1F] mb-4">
              Looking for more perks? We&apos;ve got you covered!
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative p-6 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.02, y: -3 }}
              >
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Number with decorative bracket */}
                  <div className="relative mb-4">
                    <div className="w-10 h-10 bg-[#F98F1F] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                      {perk.number}
                    </div>
                    {/* Decorative bracket */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#F98F1F] rounded-tr-lg"></div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {perk.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/images.jpeg"
                  alt="QCell Team - Diverse Professionals"
                  width={500}
                  height={350}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
              </div>
            </motion.div>

            {/* Right Column - Text and Button */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 order-1 lg:order-2"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Want to be part of the QCell Family?
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Challenge yourself today – we&apos;d love to hear from you!
                </p>
              </div>

              <motion.button
                className="bg-[#F98F1F] text-white px-6 py-3 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}