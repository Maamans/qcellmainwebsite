"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import Link from "next/link"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronRight, Menu, Search, X } from "lucide-react"
import { api, getImageUrl } from "@/lib/api"

// Placeholder for images
const QcellLogo = "/images/01-e1725631236883.png"

// Helper function to conditionally join classNames
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Fallback hero slider images (used if API fails or while loading)
const fallbackHeroImages = [
  "/images/expand your world 1.jpg",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1546027658-7aa750153465?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533777419517-3e4017e2e15a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

// Fallback hero slider content
const fallbackHeroContent = [
  {
    title: "Expand Your World with Seamless Connectivity",
    description: "Enjoy The Cheapes and most Reliable Network In Sierra leone.",
    cta: ""
  },
  {
    title: "Unlimited Data Plans for Unlimited Possibilities",
    description: "Stream, browse, and connect without limits. Our high-speed network keeps you connected wherever you go.",
    cta: "Explore Plans"
  },
  {
    title: "Business Solutions That Drive Growth",
    description: "Empower your business with our enterprise-grade connectivity solutions designed for reliability and performance.",
    cta: "Learn More"
  },
  {
    title: "Join the Qcell Family Today",
    description: "Become part of Sierra Leone's largest and most trusted telecommunications network.",
    cta: "Join Now"
  }
];

// Animation variants
const dropdownVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98],
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};
const navItems = [
    {
        title: "Personal",
        href: "/",
    },
  {
    title: "About us",
    content: {
      heading: "About Qcell",
      subheading: "Learn about our mission, leadership, and impact on Sierra Leone",
      links: [
        { title: "About Qcell", href: "/about-us" },
        { title: "Our Impact", href: "/our-impact" },
        { title: "Careers", href: "/careers" },
        { title: "Business", href: "/business" }
      ]
    },
    href: 'about-us'
  },
    {
        title: "Tarriffs",
        href: '/tariffs'
    },
    {
        title: "Devices",
        href: 'devices'
    },
    {
        title: "Internet",
        content: {
            heading: "Enjoy Ultra-Fast 4G Internet Connectivity.",
        links: [
          { title: "4G LTE", href: "#" },
          { title: "QFIBER", href: "#" },
          { title: "QFiber", href: "#" },
          { title: "Data Bundles", href: "#" },
          { title: "Unlimited Data Plans", href: "#" }
        ],
            image: "/placeholder.svg?height=200&width=400"
        },
        href: 'internet'
    },
    {
        title: "Services",
        href: 'services'
    },
  {
    title: "Promotions",
    href: 'promotions'
  },
    {
        title: "Support",
        content: {
            heading: "Here to Help, Anytime You Need.",
            subheading: "24/7 Access expert assistance, helpful resources, and quick solutions to keep you connected and informed.",
            links: [
                { title: "Customer Care", href: "#" },
                { title: "Check Balance", href: "#" },
                { title: "Buy Bundle", href: "#" },
                { title: "Know Your Number", href: "#" }
            ]
        },
        href: 'support'
    }
];
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
}

const linkVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.04, 0.62, 0.23, 0.98],
    },
  },
}

export default function Navigation() {
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  // Add a new state for the search overlay
  const [searchOpen, setSearchOpen] = useState(false)
  
  // Hero slides from API
  const [heroSlides, setHeroSlides] = useState<Array<{
    id: number;
    title: string | null;
    description: string | null;
    image: string;
    ctaText: string | null;
    ctaLink: string | null;
    order: number;
    isActive: boolean;
  }>>([])

  // Fetch hero slides from API
  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const slides = await api.getHeroSlides('/')
        // Filter only active slides and sort by ID descending (newest first)
        const activeSlides = (slides as Array<{
          id: number;
          title: string | null;
          description: string | null;
          image: string;
          ctaText: string | null;
          ctaLink: string | null;
          order: number;
          isActive: boolean;
          createdAt?: string;
        }>)
          .filter((slide) => slide.isActive)
          .sort((a, b) => {
            // Sort by createdAt if available (newest first), otherwise by ID (newest first)
            if (a.createdAt && b.createdAt) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
            return b.id - a.id
          })
        
        if (activeSlides.length > 0) {
          setHeroSlides(activeSlides)
        }
      } catch (error) {
        console.error('Failed to fetch hero slides:', error)
        // Use fallback data on error
      }
    }

    fetchHeroSlides()
  }, [])

  // Process backend slides - they will appear first
  const sanitizedBackendSlides = heroSlides.map((slide) => {
    const sanitizedTitle = (slide.title || "").trim()
    const hideTitle = sanitizedTitle.toLowerCase() === "homepage slide"

    return {
      image: getImageUrl(slide.image),
      content: {
        title: hideTitle ? "" : sanitizedTitle,
        description: (slide.description || "").trim(),
        cta: (slide.ctaText || "").trim(),
      },
    }
  })

  // Build final arrays: backend slides first, then fallback slides
  const MAX_SLIDES = fallbackHeroImages.length
  const backendImages: string[] = []
  const backendContent: Array<{ title: string; description: string; cta: string }> = []

  // Add backend slides first
  sanitizedBackendSlides.forEach((slide) => {
    if (slide.image) {
      backendImages.push(slide.image)
      // For first backend slide, use fallback text if empty or "Homepage Slide"
      if (backendImages.length === 1 && (!slide.content.title || slide.content.title.trim() === "")) {
        backendContent.push({
          title: "Expand Your World with Seamless Connectivity",
          description: "Enjoy The Cheapes and most Reliable Network In Sierra leone.",
          cta: ""
        })
      } else {
        backendContent.push({
          title: slide.content.title || "",
          description: slide.content.description || "",
          cta: slide.content.cta || "",
        })
      }
    }
  })

  // Combine: backend slides first, then fallback slides (up to MAX_SLIDES total)
  const heroImages = [...backendImages, ...fallbackHeroImages].slice(0, MAX_SLIDES)
  const heroContent = [...backendContent, ...fallbackHeroContent].slice(0, MAX_SLIDES)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
        if (window.innerWidth > 768) {
            setSearchOpen(false)
            setActiveItem(null)

        }
        
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Auto-advance slider
  useEffect(() => {
    if (heroImages.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  const currentContent = heroContent[currentSlide]

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveItem(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle dropdown animation
  useEffect(() => {
    if (activeItem) {
      controls.start("visible")
      document.querySelector('.backdrop-filter')?.classList.remove("hidden")
      document.querySelector('.backdrop-filter')?.classList.add("backdrop-blur-md")
      //return () => {
      //  document.body.classList.remove("backdrop-blur-sm")
      //}
    } else {
      controls.start("hidden")

      document.querySelector('.backdrop-filter')?.classList.add("hidden")
      document.querySelector('.backdrop-filter')?.classList.remove("backdrop-blur-md")
    }
  }, [activeItem, controls])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.querySelector('.backdrop-filter')?.classList.remove("hidden")
      document.querySelector('.backdrop-filter')?.classList.add("backdrop-blur-md")
    } else {

      document.querySelector('.backdrop-filter')?.classList.add("hidden")
      document.querySelector('.backdrop-filter')?.classList.remove("backdrop-blur-md")
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (searchOpen) {
  
      document.querySelector('.backdrop-filter')?.classList.remove("hidden")
      document.querySelector('.backdrop-filter')?.classList.add("backdrop-blur-md")
    } else {

      document.querySelector('.backdrop-filter')?.classList.add("hidden")
      document.querySelector('.backdrop-filter')?.classList.remove("backdrop-blur-md")
    }
  }, [searchOpen])

  // Add this function to handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search logic here
    setSearchOpen(false)
  }

  // Add this right before the return statement
  {/*const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      // When opening search, close any open navigation items
      setActiveItem(null)
    }
  }*/}

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 nav mx-auto text-white w-[90%] mt-[50px] pr-3 py-0 rounded-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
            marginTop: isScrolled ? "0" : "50px",
            width: isScrolled ? "100%" : "90%",
            borderRadius: isScrolled ? "0" : "0.3rem",
            backgroundColor: "#077aca",
            transition: "all 0.5s",
            backdropFilter: isScrolled ? "blur(10px)" : "blur(5px)",
        }}
      >
        {/*style={{
          backgroundColor: isScrolled ? "rgba(205, 127, 50, 0.85)" : "rgba(0, 0, 0, 0.3)",
          backdropFilter: isScrolled ? "backdrop-blur(10px)" : "backdrop-blur(5px)",
        }} */}
        
        <motion.div
          className="container mx-auto flex items-center justify-between"
          
        >
            {/*style={{
            paddingTop: isScrolled ? "0.75rem" : "1.5rem",
            paddingBottom: isScrolled ? "0.75rem" : "1.5rem",
          }}*/}
          <div className="flex items-center z-40 space-x-5">
            <motion.div
              style={{ scale: isScrolled ? 1 : 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/" className="flex items-center">
                <Image
                  src={QcellLogo || "/placeholder.svg"}
                  alt="Qcell Logo"
                  width={64}
                  height={64}
                  className="h-[52px] w-auto object-contain rounded-md rounded-tr-none rounded-br-none xl:rounded-none"
                  style={{
                    borderBottomLeftRadius: activeItem && !isScrolled ? "0px" : "8px",
                    borderTopLeftRadius: activeItem && !isScrolled ? "0px" : "8px"
                  }}
                  priority
                  unoptimized
                /> 
              </Link>
            </motion.div>
            <p className="ml-3 text-[#fad4ab] md:hidden">Expand Your World</p>
          </div>

            <nav className="ml-8 hidden items-center justify-between lg:flex">
              <ul className="flex space-x-8 items-center justify-center">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.title}
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + index * 0.05,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {item.title === "Promotions" || !item.content ? (
                      <Link href={item.href}>
                        <span className="group flex items-center py-2 text-sm font-medium text-white transition-colors hover:text-white/80">
                          {item.title}
                        </span>
                      </Link>
                    ) : (
                      <Link href={item.href ? item.href : "#"}>
                        <motion.button
                          className={cn(
                            "group flex items-center py-2 text-sm font-medium text-white transition-colors",
                            activeItem === item.title ? "text-white font-bold" : "hover:text-white/80",
                          )}
                          onClick={() => setActiveItem(activeItem === item.title ? null : item.title)}
                          onMouseEnter={() => setActiveItem(item.title)}
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2, ease: "easeOut" },
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative">
                            {item.title}
                            {activeItem === item.title && (
                              <motion.div
                                className="absolute -bottom-1 left-0 h-0.5 w-full bg-white"
                                layoutId="navUnderline"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              />
                            )}
                          </span>
                          {/* Only show dropdown chevron if item has dropdown content */}
                          {item.content && (
                            <motion.div
                              animate={{
                                rotate: activeItem === item.title ? 180 : 0,
                                transition: { duration: 0.3, ease: "easeInOut" },
                              }}
                            >
                              <ChevronDown
                                className={cn(
                                  "ml-1 h-4 w-4 transition-transform",
                                  activeItem === item.title ? "text-white" : "",
                                )}
                              />
                            </motion.div>
                          )}
                        </motion.button>
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

          {/*<div className="hidden items-center space-x-4 z-40 lg:flex">
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
              onClick={toggleSearch}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#"
                className="rounded-full bg-white px-5 py-2 text-sm font-medium text-[#F98F1F] transition-all hover:bg-white/90"
              >
                Get Started
              </Link>
            </motion.div>
          </div> */}

          <motion.button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              ref={dropdownRef}
              className="absolute left-0 w-full overflow-hidden px-5"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                backgroundColor: "rgba(7, 122, 202, 0.1)",
                backdropFilter: "backdrop-blur(20px)",
                WebkitBackdropFilter: "backdrop-blur(20px)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              {navItems.map(
                (item) =>
                  activeItem === item.title && item.content && (
                    <div key={item.title} className="container mx-auto py-8">
                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-6">
                          <motion.h2 className="text-2xl font-semibold text-white" variants={itemVariants}>
                            {item.content.heading}
                          </motion.h2>

                          {item.content.subheading && (
                            <motion.p className="text-sm text-white/90" variants={itemVariants}>
                              {item.content.subheading}
                            </motion.p>
                          )}

                          {item.content.links && (
                            <motion.div className="mt-6 grid grid-cols-3 gap-x-8 gap-y-4" variants={itemVariants}>
                              {item.content.links
                                .filter(link => link.title !== "Home")
                                .map((link, index) => (
                                  <motion.div key={link.title + link.href} variants={linkVariants} custom={index}>
                                    <Link
                                      href={link.href}
                                      className="group flex items-center text-sm text-white transition-colors hover:text-white/80 hover:underline"
                                    >
                                      <motion.div
                                        initial={{ x: -5, opacity: 0 }}
                                        whileHover={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ChevronRight className="mr-2 h-4 w-4 text-white" />
                                      </motion.div>
                                      <span className="relative overflow-hidden">
                                        {link.title}
                                        <motion.span
                                          className="absolute bottom-0 left-0 h-[1px] w-full bg-white/70"
                                          initial={{ scaleX: 0, originX: 0 }}
                                          whileHover={{ scaleX: 1 }}
                                          transition={{ duration: 0.3 }}
                                        />
                                      </span>
                                    </Link>
                                  </motion.div>
                                ))}
                            </motion.div>
                          )}
                        </div>

                        {item.content.image && (
                          <motion.div className="flex items-center justify-center" variants={imageVariants}>
                            <motion.div
                              className="overflow-hidden rounded-lg"
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                              <Image
                                src={item.content.image || "/placeholder.svg"}
                                alt={item.title}
                                width={400}
                                height={200}
                                className="object-contain transition-transform duration-700 hover:scale-105"
                              />
                            </motion.div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  ),
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Search Overlay */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="fixed left-0 right-0 top-[50px] z-[100] w-full overflow-hidden px-5"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                backgroundColor: "rgba(7, 122, 202, 0.1)",
                backdropFilter: "backdrop-blur(10px)",
                WebkitBackdropFilter: "backdrop-blur(10px)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div className="container mx-auto py-8">
                <div className="flex items-center justify-between pb-6">
                  <motion.h2
                    className="text-2xl font-semibold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    Search Qcell
                  </motion.h2>
                  <motion.button
                    className="rounded-full bg-white/20 p-2 text-white"
                    onClick={() => setSearchOpen(false)}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <motion.form
                  onSubmit={handleSearchSubmit}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/60" />
                    <input
                      type="text"
                      placeholder="Search for products, services, or support..."
                      className="w-full rounded-full border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                      autoFocus
                    />
                  </div>

                  <motion.div
                    className="mt-8 grid gap-6 md:grid-cols-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <div>
                      <h3 className="mb-3 text-sm font-medium text-white/80">Popular Searches</h3>
                      <ul className="space-y-2">
                        {["Data bundles", "Roaming", "QFiber", "Recharge", "Mobile money"].map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.05, duration: 0.3 }}
                          >
                            <Link
                              href="#"
                              className="flex items-center text-sm text-white/70 transition-colors hover:text-white"
                              onClick={() => setSearchOpen(false)}
                            >
                              <ChevronRight className="mr-2 h-4 w-4 text-[#F98F1F]/80" />
                              {item}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-medium text-white/80">Quick Links</h3>
                      <ul className="space-y-2">
                        {["Check balance", "Buy bundle", "Support", "Find a store", "Contact us"].map((item, i) => (
                          <motion.li
                            key={item}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                          >
                            <Link
                              href="#"
                              className="flex items-center text-sm text-white/70 transition-colors hover:text-white"
                              onClick={() => setSearchOpen(false)}
                            >
                              <ChevronRight className="mr-2 h-4 w-4 text-[#F98F1F]/80" />
                              {item}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="mb-3 text-sm font-medium text-white/80">Featured</h3>
                      <div className="overflow-hidden rounded-lg border border-white/20">
                        <div className="relative h-32 w-full">
                          <Image
                            src="/placeholder.svg?height=200&width=400"
                            alt="Featured promotion"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                          <div className="absolute bottom-0 left-0 p-3">
                            <p className="text-sm font-medium text-white">Special Offer</p>
                            <p className="text-xs text-white/80">Limited time promotion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed overflow-y-scroll no-scrollbar inset-0 z-50 bg-gradient-to-b from-[#333333] to-[#CD7F32]/90 lg:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full flex-col overflow-y-auto z-40">
              <div className="flex items-center justify-between border-b border-white/20 px-4 py-4">
                <Link href="/" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src={QcellLogo || "/placeholder.svg"}
                    alt="Qcell Logo"
                    width={48}
                    height={48}
                    className="h-12 w-auto object-contain rounded-md"
                    priority
                    unoptimized
                  /> <span className="ml-3 text-white">Expand Your World</span>
                </Link>
                <motion.button
                  className="rounded-full bg-white/20 p-2 text-white z-40"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="z-40 h-5 w-5" />
                </motion.button>
              </div>

              <nav className="flex-1 px-4 py-6 overflow-y-scroll no-scrollbar">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.title}
                      className="py-2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + index * 0.05,
                        duration: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      
                      {item.content ? (
                        <>
                          <motion.button
                            className="flex w-full items-center justify-between text-left text-base font-medium text-white"
                            onClick={() => setMobileSubmenu(mobileSubmenu === item.title ? null : item.title)}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>{item.title}</span>
                            <motion.div
                              animate={{
                                rotate: mobileSubmenu === item.title ? 180 : 0,
                                transition: { duration: 0.3 },
                              }}
                            >
                              <ChevronDown className="h-5 w-5 text-white/80" />
                            </motion.div>
                          </motion.button>

                          <AnimatePresence>
                            {mobileSubmenu === item.title && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 space-y-4 pl-4">
                                  {item.content && (
                                    <>
                                      <motion.p
                                        className="text-sm font-medium text-white"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1, duration: 0.3 }}
                                      >
                                        {item.content.heading}
                                      </motion.p>

                                      {item.content.subheading && (
                                        <motion.p
                                          className="text-xs text-white/80"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: 0.2, duration: 0.3 }}
                                        >
                                          {item.content.subheading}
                                        </motion.p>
                                      )}

                                      {item.content.links && (
                                        <ul className="mt-2 space-y-2 border-l border-white/30 pl-4">
                                          {item.content.links
                                            .filter(link => link.title !== "Home")
                                            .map((link, linkIndex) => (
                                              <motion.li
                                                key={link.title + link.href}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                  delay: 0.2 + linkIndex * 0.05,
                                                  duration: 0.3,
                                                }}
                                                whileHover={{ x: 5 }}
                                              >
                                                <Link
                                                  href={link.href}
                                                  className="text-sm text-white/90 transition-colors hover:text-white"
                                                  onClick={() => setMobileMenuOpen(false)}
                                                >
                                                  {link.title}
                                                </Link>
                                              </motion.li>
                                            ))}
                                        </ul>
                                      )}
                                    </>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                          <span className="flex w-full items-center justify-between text-left text-base font-medium text-white py-2">{item.title}</span>
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t z-40 border-white/20 px-4 py-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="#"
                    className="flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-base font-medium text-[#F98F1F]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
                <motion.div
                  className="mt-4 flex items-center justify-center z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {/*<motion.button
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
                    onClick={() => {
                        setMobileMenuOpen(false)
                        toggleSearch()
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.button>*/}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Slider */}
      <div ref={heroRef} className={isScrolled ? "relative min-h-screen overflow-hidden sm:px-10" : "relative min-h-screen overflow-hidden sm:px-20"}>
        {/* Slider Images */}
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{
                transition: "all 2s"
            }}
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#ff8400]/80 to-[#ff8400]/80 mix-blend-overlay" />
            <Image
              src={heroImages[currentSlide] || "/placeholder.svg"}
              alt={`Slide ${currentSlide + 1}`}
              fill
              className="object-cover sm:object-center object-[center_35%]"
              sizes="100vw"
              priority
              unoptimized
            />
          </motion.div>
        </AnimatePresence>

        {/* Slider Controls removed for mobile */}

        {/* Slider Indicators absolute z-40 bottom-8 left-0 right-0 flex justify-center space-x-2*/}
        <div className="absolute z-40 bottom-52 left-5 right-0 flex space-x-2 sm:left-0 sm:justify-center sm:bottom-8">
          {heroImages.map((_, index) => (
            <motion.button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "w-8 bg-[#ff8400]" : "w-2 bg-[#c3c3c3]/50"
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{
                scale: 1.2,
                backgroundColor: currentSlide === index ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.7)",
              }}
              whileTap={{ scale: 0.9 }}
              style={{ backgroundColor: currentSlide === index ? "#ff8400" : "#c3c3c3/50" }}
            />
          ))}
        </div>

        {/* Slider Content */}
        <div className="relative z-20 flex min-h-screen items-center">
          <div className="container mx-auto px-4 py-24 text-white">
            <AnimatePresence mode="wait">
              {currentContent && (currentContent.title || currentContent.description || currentContent.cta) && (
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="max-w-2xl"
                >
                  {currentContent.title && (
                    <motion.h1
                      className="text-4xl font-bold sm:text-5xl lg:text-6xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {currentContent.title}
                    </motion.h1>
                  )}
                  {currentContent.description && (
                    <motion.p
                      className="mt-6 text-lg text-white/90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {currentContent.description}
                    </motion.p>
                  )}
                  {currentContent.cta && (
                    <motion.div
                      className="mt-8 flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="#"
                          className="rounded-full bg-[#F98F1F] px-6 py-3 text-base font-medium text-white transition-all hover:bg-white/90 hover:shadow-lg "
                        >
                          {currentContent.cta}
                        </Link>
                      </motion.div>
                      {/*<motion.div
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          href="#"
                          className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                        >
                          Learn more about us
                        </Link>
                      </motion.div>*/}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

