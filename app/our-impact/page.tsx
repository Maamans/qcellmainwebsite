"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Navigation from "@/components/nav"
import Footer from "@/components/footer"
import { GraduationCap, Heart, Users, Leaf, ChevronLeft, ChevronRight } from "lucide-react"

export default function OurImpactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    document.title = 'Our Impact - Qcell'
  }, [])

  // Hero slides data
  const heroSlides = [
    {
      image: "/images/download (8) 1.png",
      title: "QCell's Commitment to Fostering Innovation in Sierra Leone",
      subtitle: "QCell partnered with QMoneySL and AFCOM to support the Knesst Developers Challenge, fostering innovation in agriculture, AIFML, and KYC in Sierra Leone."
    },
    {
      image: "/images/download (8) 1.png",
      title: "Empowering Communities Through Technology",
      subtitle: "Connecting Sierra Leone with innovative telecommunications solutions and digital services that transform lives and businesses."
    },
    {
      image: "/images/download (8) 1.png",
      title: "Building a Digital Future for Sierra Leone",
      subtitle: "Leading the digital transformation with cutting-edge technology, reliable connectivity, and community-focused initiatives."
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroSlides.length])

  const csrFocusAreas = [
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: "Education",
      description: "Supporting educational initiatives and digital learning programs"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Healthcare",
      description: "Providing medical support and health awareness programs"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Digital Inclusion",
      description: "Bridging the digital divide and empowering communities"
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Environmental Sustainability",
      description: "Promoting green initiatives and sustainable practices"
    }
  ]


  const recentActivities = [
    {
      image: "/images/images (1).jpeg",
      title: "Sierra Leone Innovates Tech Summit",
      description: "QCell sponsored the Sierra Leone Innovates Tech Summit, supporting young entrepreneurs and fostering innovation in the tech ecosystem."
    },
    {
      image: "/images/images (2).jpeg",
      title: "Wellington Fire Relief Support",
      description: "QCell provided medical and food aid to victims of the Wellington fire accident, offering much-needed relief during a difficult time."
    },
    {
      image: "/images/images.jpeg",
      title: "Rural Health Initiative",
      description: "Qcell partnered with local health organizations to provide free medical check-ups and supplies in rural communities across Sierra Leone."
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
      <Navigation page="our-impact" />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Images with Carousel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt="QCell CSR Activities"
              fill
              className="object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>
        </AnimatePresence>

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

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-8 right-8 flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CSR Focus Areas */}
      <section className="relative py-20 -mt-64 z-10">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            ref={containerRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="bg-[#F98F1F] rounded-3xl p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {csrFocusAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#F98F1F] rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                      {area.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-8xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Section - Text, Button, and Statistics */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  View Our Gallery of Our CSR Activities
                </h2>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  See How We&apos;re Making an Impact
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Explore our latest CSR initiatives that are driving positive change in communities through education, innovation, health, and sustainability.
                </p>
              </div>

              {/* Call-to-Action Button */}
              <motion.div
                className="flex justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <button className="bg-gradient-to-b from-orange-400 to-orange-600 text-white font-bold py-4 px-8 rounded-xl text-lg hover:from-orange-500 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  View More
                </button>
              </motion.div>

              {/* Statistics Box */}
              <motion.div
                className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50+</div>
                    <div className="text-sm text-gray-600">Health Drives</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500K+</div>
                    <div className="text-sm text-gray-600">Beneficiaries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">20+</div>
                    <div className="text-sm text-gray-600">Communities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">4.9/5</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Section - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative overflow-hidden"
            >
              <div className="relative">
                {/* Bottom rectangle (orange border) - positioned to show */}
                <div className="absolute -bottom-4 -right-4 w-4/5 h-4/5 bg-transparent rounded-2xl border-2 border-orange-500"></div>
                {/* Top rectangle (white border) - positioned to show */}
                <div className="absolute -top-4 -left-4 w-4/5 h-4/5 bg-transparent rounded-2xl border-2 border-orange-500"></div>
                {/* Image container */}
                <div className="relative z-10 bg-white rounded-2xl p-3 shadow-xl">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                    <Image
                      src="/images/images.jpeg"
                      alt="CSR Activities - Community Distribution"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Recent CSR Activities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Recent CSR Activities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </>
  )
}
