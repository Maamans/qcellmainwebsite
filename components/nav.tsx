"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import type React from "react"

import Link from "next/link"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import Image from "next/image"
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react"

// Placeholder for images
const QcellLogo = "/images/01-e1725631236883.png"

interface NavItem {
    title: string;
    content?: {
        heading: string;
        subheading?: string;
        links?: Array<{
            title: string;
            href: string;
        }>;
        image?: string;
    };
    href: string;
}

const navItems: NavItem[] = [
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
          { title: "Our Impact", href: "/our-impact" },
          { title: "Careers", href: "/careers" },
          { title: "Business", href: "/business" },
        ],
      },
      href: "/about-us",
    },
    {
        title: "Devices",
        href: '/devices'
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
        { title: "Unlimited Data Plans", href: "#" },
      ],
        image: "/placeholder.svg?height=200&width=400",
        },
        href: 'internet'
    },
    {
        title: "Services",
        href: 'services'
    },
  {
    title: "Tarriffs",
    href: '/tariffs',
  },
    {
        title: "Promotions",
        href: "/promotions",
    },
    {
        title: "Support",
        content: {
        heading: "Here to Help, Anytime You Need.",
        subheading:
            "24/7 Access expert assistance, helpful resources, and quick solutions to keep you connected and informed.",
        links: [
            { title: "Customer Care", href: "#" },
            { title: "Check Balance", href: "#" },
            { title: "Buy Bundle", href: "#" },
            { title: "Know Your Number", href: "#" },
        ],
        },
        href: 'support'
    },
]


const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ")
}

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
}

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

export default function Navigation({page}: {page: string}) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  // Add a new state for the search overlay
  const [searchOpen, setSearchOpen] = useState(false)

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

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header className="mx-auto w-[90%]"
      >
      <motion.div
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 nav mx-auto text-white w-[90%] mt-[50px] pr-3 py-0 rounded-none"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
            marginTop: isScrolled ? "0" : "50px",
            width: isScrolled ? "100%" : "90%",
            borderRadius: isScrolled ? "0" : "0.3rem",
            backgroundColor: isScrolled ? "rgba(158, 82, 1, 0.75)" : "rgba(158, 82, 1, 0.3)",
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
            <p className="ml-3 text-[#fad4ab] md:hidden">{page !== 'about-us' ? 'QCELL' : ''} {page.charAt(0).toUpperCase() + page.slice(1)}</p>
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
                    {item.title === "Personal" ? (
                      <motion.button
                        className={cn(
                          "group flex items-center py-2 text-sm font-medium text-white transition-colors",
                          activeItem === item.title ? "text-white font-bold" : "hover:text-white/80",
                        )}
                        onClick={e => {
                          e.preventDefault();
                          setActiveItem(null);
                          if (window.location.pathname !== "/") {
                            router.push("/");
                          }
                        }}
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative">{item.title}</span>
                      </motion.button>
                    ) : item.title === "Promotions" ? (
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
                          onClick={() => {
                            if (item.content) {
                              setActiveItem(activeItem === item.title ? null : item.title);
                            } else {
                              setActiveItem(null);
                            }
                          }}
                          onMouseEnter={() => {
                            if (item.content) {
                              setActiveItem(item.title);
                            }
                          }}
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2, ease: "easeOut" },
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative">
                            {item.title}
                            {item.title !== "Promotions" && activeItem === item.title && (
                              <motion.div
                                className="absolute -bottom-1 left-0 h-0.5 w-full bg-white"
                                layoutId="navUnderline"
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              />
                            )}
                          </span>
                          {/* Only show dropdown chevron if item has dropdown content and is not Promotions */}
                          {item.content && item.title !== "Promotions" && (
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
          {activeItem && activeItem !== "Promotions" && (
            <motion.div
              ref={dropdownRef}
              className="absolute left-0 w-full overflow-hidden px-5"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{
                backgroundColor: isScrolled ? "rgba(158, 82, 1, 0.3)" : "rgba(158, 82, 1, 0.3)",
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
                            <motion.div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4" variants={itemVariants}>
                              {item.content.links.map((link, index) => (
                                <motion.div key={link.title} variants={linkVariants} custom={index}>
                                  <Link
                                    href={link.href}
                                    className="group flex items-center text-sm text-white transition-colors hover:text-white/80 hover:underline"
                                    onClick={() => setActiveItem(null)}
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
        
      </motion.div>
      {page == 'careers' && (
        
        <motion.header className="hidden fixed w-[90%] mx-auto text-white top-0 z-50 sm:flex items-center justify-between"
          style={{
            marginTop: isScrolled ? "55px" : "105px",
            width: isScrolled ? "90%" : "90%",
            transition: "all 0.5s",
          }}>
            <h2 className="">Careers at QCELL</h2>
            <div className="flex gap-5">
              <h3>Life at QCELL</h3>
              <h3>Work at QCELL</h3>
            </div>
        </motion.header> )
      }
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
                  /> {/*<span className="ml-3 text-white">Expand Your World</span>*/}
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
                      {item.title === "Personal" ? (
                        <motion.button
                          className="flex w-full items-center justify-between text-left text-base font-medium text-white"
                          onClick={e => {
                            e.preventDefault();
                            setMobileMenuOpen(false);
                            if (window.location.pathname !== "/") {
                              router.push("/");
                            }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>{item.title}</span>
                        </motion.button>
                      ) : item.title === "Promotions" ? (
                        <Link href={item.href} onClick={() => setMobileMenuOpen(false)}>
                          <span className="flex w-full items-center justify-between text-left text-base font-medium text-white py-2">{item.title}</span>
                        </Link>
                      ) : (
                        item.content ? (
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
                                          <Link href={item.href}>{item.content.heading}</Link>
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
                                                  key={link.title}
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
                        )
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
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

