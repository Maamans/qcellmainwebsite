"use client"

import React, { useRef} from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, amount: 0.1 })

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden z-40"
      style={{
        background: "linear-gradient(135deg, #ffffff 0%, #f9f9f9 50%, #f5f5f5 100%)",
      }}
    >
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">

        {/* Contact + Social */}
        <div className="grid gap-8 border-t border-gray-200 pt-8 md:grid-cols-2">

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-[#F98F1F]" />
                <span className="text-sm text-gray-600">
                  QCell House, 26A Kingharman Road, Freetown, Sierra Leone
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-[#F98F1F]" />
                <span className="text-sm text-gray-600">+232 32 000000</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-[#F98F1F]" />
                <span className="text-sm text-gray-600">info@qcell.sl</span>
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-[#F98F1F] hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="mt-6">
              <Image
                src="/images/logo.jpg"
                alt="QCell Logo"
                width={120}
                height={50}
                className="h-12 w-auto"
                unoptimized
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Links */}
        <motion.div
          className="mt-8 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 pt-8 text-sm text-gray-500 md:flex-row md:space-y-0"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        >
          <div>
            <p>Copyright © {new Date().getFullYear()} QCell Ltd. All rights reserved.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            {[
              { name: "Customer Care Shops", href: "/customer-care-shops" }, // ✅ ADDED
              { name: "Privacy Policy", href: "#" },
              { name: "Terms of Use", href: "#" },
              { name: "Sales & Refunds", href: "#" },
              { name: "Legal", href: "#" },
              { name: "Site Map", href: "#" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Link href={item.href} className="hover:text-[#F98F1F]">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}