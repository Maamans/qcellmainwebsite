"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import ProductCard from "./product-card"
import FeaturedProductCard from "./featured-product-card"

// Product data
const categories = ["NEW IN", "Mobile", "TV & AV", "Home appliances"]

const newInProducts = [
  {
    id: "galaxy-s25",
    title: "Galaxy S25 | S25+",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    isNew: true,
  },
  {
    id: "galaxy-watch",
    title: "Galaxy Watch Ultra",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "gaming-monitor",
    title: "Bigger Screen, Bolder Gaming Experience",
    image: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "bespoke",
    title: "Bespoke",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ai-tv",
    title: "A New Era of Samsung AI TV",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
  },
]

const mobileProducts = [
  {
    id: "galaxy-s25-mobile",
    title: "Galaxy S25 | S25+",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000&auto=format&fit=crop",
    featured: true,
    isNew: true,
  },
  {
    id: "galaxy-fold",
    title: "Galaxy Z Fold",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "galaxy-flip",
    title: "Galaxy Z Flip",
    image: "https://images.unsplash.com/photo-1581993192873-bf5f4b27a2d7?q=80&w=1000&auto=format&fit=crop",
  },
]

const tvProducts = [
  {
    id: "oled",
    title: "OLED",
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "neo-qled",
    title: "Neo QLED TV",
    image: "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "the-frame",
    title: "The Frame",
    image: "https://images.unsplash.com/photo-1545022388-9e6d95c77174?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "crystal-uhd",
    title: "Crystal UHD TV",
    image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "soundbar",
    title: "Soundbar",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1000&auto=format&fit=crop",
  },
]

const homeProducts = [
  {
    id: "refrigerator",
    title: "Bespoke Refrigerator",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1000&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "washer",
    title: "Smart Washer",
    image: "https://images.unsplash.com/photo-1626806787461-102c1a7f1c62?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "air-purifier",
    title: "Air Purifier",
    image: "https://images.unsplash.com/photo-1585771273272-6e4d4bb4f1d2?q=80&w=1000&auto=format&fit=crop",
  },
]

export default function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState("NEW IN")

  // Get products based on active category
  const getProducts = () => {
    switch (activeCategory) {
      case "Mobile":
        return mobileProducts
      case "TV & AV":
        return tvProducts
      case "Home appliances":
        return homeProducts
      default:
        return newInProducts
    }
  }

  const products = getProducts()
  const featuredProduct = products.find((p) => p.featured)
  const regularProducts = products.filter((p) => !p.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <ul className="flex space-x-8">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative px-2 py-2 text-sm font-medium transition-colors",
                  activeCategory === category ? "text-black" : "text-gray-500 hover:text-gray-800",
                )}
              >
                {category}
                {activeCategory === category && (
                  <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" layoutId="underline" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Featured product (spans 2 columns on desktop) */}
          {featuredProduct && (
            <div className="md:col-span-1 lg:col-span-1 row-span-2">
              <FeaturedProductCard product={featuredProduct} />
            </div>
          )}

          {/* Regular products */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {regularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
