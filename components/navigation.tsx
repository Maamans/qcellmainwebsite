"use client"

import * as React from "react"
import { useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Image, { StaticImageData } from "next/image"
import QcellLogo from "@/public/images/01-e1725631236883.png"
import Qcell4G from "@/public/images/4g.png"
import AnimatedHeroText from "./animated-hero-text"

interface NavItem {
  title: string
  content: {
    heading: string
    subheading?: string
    links?: Array<{
      title: string
      href: string
    }>
    image?: string | StaticImageData
  }
}

const navItems: NavItem[] = [
  {
    title: "About us",
    content: {
      heading: "Latest Updates",
      subheading: "Stay up to date with our newest offerings",
      links: [
        { title: "Home", href: "/" },
        { title: "About Qcell", href: "/about-us" },
        { title: "Careers", href: "/careers" }
      ]
    }
  },
  {
    title: "Tarriffs",
    content: {
      heading: "Latest Updates",
      subheading: "Stay up to date with our newest offerings",
      links: [
        { title: "Home", href: "/" },
        { title: "Tarriffs", href: "/tariffs" },
        { title: "On-net and off-net", href: "/tariffs" }
      ]
    }
  },
  {
    title: "Devices",
    content: {
      heading: "Stay Connected, Anywhere, Anytime with Qcell Mobile Plans.",
      links: [
        { title: "Home", href: "/" },
        { title: "Indoor Routers", href: "#" },
        { title: "Mifi Devices", href: "#" },
        { title: "Mobile Devices", href: "#" }
      ]
    }
  },
  {
    title: "Internet",
    content: {
      heading: "Enjoy Ultra-Fast 4G Internet Connectivity.",
      links: [
        { title: "Home", href: "/" },
        { title: "QFiber", href: "#" },
        { title: "Data Bundles", href: "#" },
        { title: "Unlimited Data Plans", href: "#" }
      ],
      image: Qcell4G
    }
  },
  {
    title: "Services",
    content: {
      heading: "Explore a wide range of services designed to keep you connected and productive.",
      subheading: "From fast internet solutions to innovative business tools, Qcell is here to empower your journey.",
      links: [
        { title: "Home", href: "/" },
        { title: "Instant Roaming", href: "#" },
        { title: "List Of Roaming Partners", href: "#" },
        { title: "CUG", href: "#" },
        { title: "QFiber", href: "#" },
        { title: "VAS Offers", href: "#" },
        { title: "ESIM", href: "#" }
      ]
    }
  },
  {
    title: "Promotions",
    content: {
      heading: "Unbeatable Offers, Just for You!",
      subheading: "Discover the latest deals, discounts, and exclusive offers designed to keep you connected at the best rates.",
      links: [
        { title: "Home", href: "/" },
        { title: "Emergency Sites", href: "#" },
        { title: "Recharge Bonanza", href: "#" },
        { title: "Qcell Bonanza", href: "#" },
        { title: "Tok En Browse", href: "#" },
        { title: "Qnite", href: "#" }
      ]
    }
  },
  {
    title: "Support",
    content: {
      heading: "Here to Help, Anytime You Need.",
      subheading: "24/7 Access expert assistance, helpful resources, and quick solutions to keep you connected and informed.",
      links: [
        { title: "Home", href: "/" },
        { title: "Customer Care", href: "#" },
        { title: "Check Balance", href: "#" },
        { title: "Buy Bundle", href: "#" },
        { title: "Know Your Number", href: "#" }
      ]
    }
  },
  /*{
    title: "Join Us",
    content: {
      heading: "Become Part of Our Network",
      subheading: "Join the fastest growing network in the region"
    }
  }*/
]

export default function Navigation() {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  //bg-[#FF8E00]
  useEffect(() => {
    const heroElement = document.querySelector('.hero') as HTMLElement;
    if (heroElement) {
      heroElement.style.filter = activeItem ? 'blur(2px)' : 'none';
    }
  }, [activeItem]);
  return (
    <div className="relative">
      <motion.nav
        className="nav absolute mx-auto z-20 text-white left-[5%] w-[90%] mt-[50px]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container flex items-center justify-between pr-5 lg:pr-10">
          <Link href="/" className="rounded-tl-[8px] flex-shrink-0 rounded-bl-[8px] flex items-center justify-center overflow-hidden mr-4 sm:-mt-5 sm:mr-0">
            <Image
              src={QcellLogo}
              alt="Qcell Logo"
              width={64}
              height={64}
              className="h-[52px] w-auto object-contain flex-shrink-0"
            />
          </Link>
          <div className="flex space-x-5 sm:space-x-5 md:space-x-8 overflow-x-scroll">
            {navItems.map((item, index) => (
              <>
                {item.title === "Tarriffs" || item.title === "Services" ? (
                  <Link
                    key={item.title}
                    href={item.title === "Tarriffs" ? "/tariffs" : "/services"}
                    className={`nav-btn relative py-4 text-sm font-medium transition-colors flex-shrink-0 hover:text-white/90 text-white`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <motion.button
                    key={item.title}
                    className={`nav-btn relative py-4 text-sm font-medium transition-colors flex-shrink-0 hover:text-white/90 ${
                      activeItem === item.title ? "text-white border-b-2" : "text-white"
                    }`}
                    onMouseEnter={() => setActiveItem(item.title)}
                    onMouseLeave={() => setActiveItem(null)}
                    onClick={() => setActiveItem(activeItem === item.title ? null : item.title)}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  >
                    {item.title}
                    {activeItem === item.title && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-white text-white"
                        layoutId="underline"
                      />
                    )}
                  </motion.button>
                )}
              </>
            ))}
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {activeItem && activeItem !== "Tarriffs" && activeItem !== "Services" && (
          <>
            <motion.div
              className="fixed inset-0 z-10 bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
            />
            <motion.div
              className="nav-items-container absolute right-0 z-10 bg-[#CD7F32]/95 text-white+ left-[5%] w-[90%] mt-[100px]"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navItems.map(
                (item) =>
                  activeItem === item.title && (
                    <div key={item.title} className="container mx-auto p-8">
                      <div className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4">
                          <h2 className="text-2xl font-semibold text-white">{item.content.heading}</h2>
                          {item.content.subheading && (
                            <p className="text-sm text-white/80 text-white">{item.content.subheading}</p>
                          )}
                          {item.content.links && (
                            <div className="grid gap-2 pt-4 text-white">
                              {item.content.links.map((link) => (
                                <Link
                                  key={link.title + link.href}
                                  href={link.href}
                                  className={
                                    link.title === "Home"
                                      ? "text-sm font-bold text-white hover:text-white/80 bg-[#ff8400]/80 rounded-md px-2 py-2"
                                      : "text-sm text-white hover:text-white/90"
                                  }
                                >
                                  {link.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                        {item.content.image && (
                          <div className="flex items-center justify-center">
                            <Image
                              src={item.content.image || "/placeholder.svg"}
                              alt={item.title}
                              width={400}
                              height={200}
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.div
        className="relative hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          
        />
        <div className="relative">
          <div className="container mx-auto py-24 text-white px-5 md:px-10 lg:px-24">
            {/*<motion.h1
              className="max-w-2xl text-5xl font-bold z-10 mt-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Expand Your World with Seamless Connectivity
            </motion.h1> pk.eyJ1IjoiZGF2aWRjb250ZWgiLCJhIjoiY202OWltNXdhMDlsaDJqcjlwaGtneWhlYSJ9.xtv9kE0JHaW2H85UjUldFw*/}
            <motion.div
              className="max-w-2xl text-5xl font-bold z-10 mt-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <AnimatedHeroText text="Expand Your World with Seamless Connectivity" />
            </motion.div>
            <motion.p
              className="mt-4 max-w-xl text-lg text-white/80 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Experience the fastest, cheapest, and most reliable network in Sierra Leone. Empowering your
              digital journey, one connection at a time
            </motion.p>
            <motion.div
              className="mt-8 flex gap-4 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <Link
                href="#"
                className="rounded-md bg-[#F98F1F] px-3 py-1 sm:px-6 sm:py-3 pt-[16px] sm:pt-[18px] font-medium text-white transition-colors hover:bg-[#CD7F32]/90"
              >
                Find us
              </Link>
              <Link
                href="#"
                className="rounded-md border border-white px-6 py-3 pt-[14px] font-medium text-white transition-colors hover:bg-white/10"
              >
                Learn more about us
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}