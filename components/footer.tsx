"use client"

import React from 'react'
import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react"

export default function Footer() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  //const [emailFocus, setEmailFocus] = useState(false)
  //const [email, setEmail] = useState("")
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.1 })

  const toggleSection = (section: string) => {
    console.log("Toggle section:", section, "Current expanded:", expandedSection)
    setExpandedSection(expandedSection === section ? null : section)
  }

  const footerSections = [
    {
      title: "Shop and Learn",
      links: [
        { name: "Data Bundles", href: "#" },
        { name: "Voice Bundles", href: "#" },
        { name: "Devices", href: "#" },
        { name: "QFiber", href: "#" },
        { name: "Roaming", href: "#" },
        { name: "Mobile Money", href: "#" },
      ],
    },
    {
      title: "Qcell Store",
      links: [
        { name: "Find a Store", href: "#" },
        { name: "Today at Qcell", href: "#" },
        { name: "Promotions", href: "#" },
        { name: "Qcell App", href: "#" },
        { name: "Certified Resellers", href: "#" },
        { name: "Financing", href: "#" },
      ],
    },
    {
      title: "For Business",
      links: [
        { name: "Qcell for Business", href: "#" },
        { name: "Shop for Business", href: "#" },
        { name: "Business Solutions", href: "#" },
        { name: "Enterprise Connectivity", href: "#" },
        { name: "Corporate Accounts", href: "#" },
      ],
    },
    {
      title: "Qcell Values",
      links: [
        { name: "Accessibility", href: "#" },
        { name: "Environment", href: "#" },
        { name: "Privacy", href: "#" },
        { name: "Corporate Responsibility", href: "#" },
        { name: "Supplier Responsibility", href: "#" },
      ],
    },
    {
      title: "Shortcodes & Purpose",
      links: [
        { name: <><span className="font-bold">*303#</span> Check Balance</>, href: "#" },
        { name: <><span className="font-bold">*124#</span> Check Data Balance</>, href: "#" },
        { name: <><span className="font-bold">*122#</span> Buy Data Bundle</>, href: "#" },
        { name: <><span className="font-bold">*133#</span> Borrow Credit</>, href: "#" },
        { name: <><span className="font-bold">*100#</span> Customer Care</>, href: "#" },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const linkVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const socialIconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.3 + index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    }),
    hover: {
      scale: 1.2,
      backgroundColor: "#F98F1F",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  }

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden z-40"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 50%, #f5f5f5 100%)",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#F98F1F]/5 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#F98F1F]/5 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Newsletter signup */}
      <div className="relative border-b border-gray-200">
        {/*<div className="container mx-auto px-4 py-12 md:px-6">
          <motion.div
            className="flex flex-col items-center justify-between gap-8 md:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-gray-900">Stay connected with Qcell</h3>
              <p className="mt-2 text-gray-600">Subscribe to our newsletter for exclusive offers and updates</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="relative">
                <motion.input
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                  className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 pr-32 text-gray-700 focus:border-[#F98F1F] focus:outline-none focus:ring-2 focus:ring-[#F98F1F]/20"
                  animate={{
                    boxShadow: emailFocus ? "0 0 0 3px rgba(249, 143, 31, 0.2)" : "none",
                  }}
                />
                <motion.button
                  type="submit"
                  className="absolute right-1 top-1 rounded-full bg-[#F98F1F] px-5 py-2 text-sm font-medium text-white transition-all hover:bg-[#F98F1F]/90"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>*/}
      </div>

      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Desktop Footer */}
          {footerSections.map((section) => (
            <motion.div
              key={section.title}
              className="hidden lg:block"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={containerVariants}
            >
              <motion.h3 className="mb-4 text-lg font-semibold text-gray-900" variants={itemVariants}>
                {section.title}
              </motion.h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    variants={linkVariants}
                    custom={linkIndex}
                    onMouseEnter={() => setHoveredLink(`${section.title}-${linkIndex}`)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    <Link
                      href={link.href}
                      className="group relative flex items-center text-sm text-gray-600 transition-colors hover:text-[#F98F1F]"
                    >
                      <motion.span
                        initial={{ width: 0 }}
                        animate={{
                          width: hoveredLink === `${section.title}-${linkIndex}` ? "100%" : 0,
                          transition: { duration: 0.3 },
                        }}
                        className="absolute bottom-0 left-0 h-[1px] bg-[#F98F1F]/60"
                      />
                      {link.name}
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: hoveredLink === `${section.title}-${linkIndex}` ? 1 : 0,
                          x: hoveredLink === `${section.title}-${linkIndex}` ? 0 : -10,
                          transition: { duration: 0.2 },
                        }}
                        className="ml-1"
                      >
                        <ArrowUpRight className="h-3 w-3 text-[#F98F1F]" />
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Mobile Footer Accordions */}
          <div className="z-40 col-span-full lg:hidden">
            {footerSections.map((section) => (
              <div key={section.title} className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="flex w-full items-center justify-between py-4 text-left"
                >
                  <span className="text-base font-medium text-gray-900">{section.title}</span>
                  <motion.div
                    animate={{ rotate: expandedSection === section.title ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {expandedSection === section.title && (
                    <motion.div
                      key={`accordion-${section.title}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 pb-4">
                        {section.links.map((link, linkIndex) => (
                          <motion.li
                            key={linkIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Link
                              href={link.href}
                              className="flex items-center text-sm text-gray-600 transition-colors hover:text-[#F98F1F]"
                            >
                              <ChevronRight className="mr-2 h-4 w-4 text-[#F98F1F]/70" />
                              {link.name}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Contact and Social */}
        <div className="mt-12 z-40 grid gap-8 border-t border-gray-200 pt-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <MapPin className="mr-3 h-5 w-5 text-[#F98F1F]" />
                <span className="text-sm text-gray-600">Qcell House, 16 Wilkinson Road, Freetown, Sierra Leone</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <Phone className="mr-3 h-5 w-5 text-[#F98F1F]" />
                <span className="text-sm text-gray-600">+232 32 000000</span>
              </motion.li>
              <motion.li
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ x: 5 }}
              >
                <Mail className="mr-3 h-5 w-5 text-[#F98F1F]" />
                <span className="text-sm text-gray-600">info@qcell.sl</span>
              </motion.li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-start md:items-end"
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook className="h-5 w-5" />, href: "https://www.facebook.com/QcellSL" },
                { icon: <Twitter className="h-5 w-5" />, href: "https://x.com/QcellSL" },
                { icon: <Instagram className="h-5 w-5" />, href: "https://www.instagram.com/qcellsl" },
                { icon: <Linkedin className="h-5 w-5" />, href: "https://www.linkedin.com/company/qcell-sl" },
                { icon: <Youtube className="h-5 w-5" />, href: "https://www.youtube.com/channel/UCA3CZ0WGrqtwjRvX1nWVd_w" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all hover:bg-[#F98F1F] hover:text-white"
                  variants={socialIconVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap="tap"
                  custom={index}
                  target='_blank'
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <div className="mt-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image src="/images/logo.jpg" alt="Qcell Logo" width={120} height={50} className="h-12 w-auto" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 pt-8 text-sm text-gray-500 md:flex-row md:space-y-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div>
            <p>Copyright © {new Date().getFullYear()} Qcell Ltd. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            {["Privacy Policy", "Terms of Use", "Sales & Refunds", "Legal", "Site Map"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Link href="#" className="hover:text-[#F98F1F]">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}