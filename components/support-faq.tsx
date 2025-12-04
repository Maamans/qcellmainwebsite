"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { api } from "@/lib/api"

interface SupportItem {
  id: string | number
  title: string
  description: string
  category: string
  order?: number
  isActive?: boolean
}

// Fallback FAQ items (used if backend unavailable)
const fallbackSupportItems: SupportItem[] = [
  {
    id: 1,
    title: "How do I check my account balance?",
    description: "You can check your account balance by dialing *123# and selecting 'Check Balance', or by using the QCell mobile app.",
    category: "customer-care",
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    title: "How do I buy a data bundle?",
    description: "To buy a data bundle, dial *123# and select 'Buy Bundle', or use the QCell mobile app. You can also purchase bundles online through our website.",
    category: "buy-bundle",
    order: 1,
    isActive: true,
  },
  {
    id: 3,
    title: "How do I contact customer care?",
    description: "You can contact customer care by calling our 24/7 helpline at *123#, using live chat on our website, or emailing support@qcell.com.sl.",
    category: "customer-care",
    order: 2,
    isActive: true,
  },
  {
    id: 4,
    title: "How do I activate my SIM card?",
    description: "To activate your SIM card, insert it into your phone and follow the on-screen instructions. You may need to dial *123# to complete activation.",
    category: "customer-care",
    order: 3,
    isActive: true,
  },
  {
    id: 5,
    title: "What are your business hours?",
    description: "Our customer care is available 24/7. Our physical stores are open Monday to Saturday from 8:00 AM to 6:00 PM.",
    category: "customer-care",
    order: 4,
    isActive: true,
  },
  {
    id: 6,
    title: "How do I top up my account?",
    description: "You can top up your account using scratch cards, mobile money, bank transfer, or online payment. Dial *123# and select 'Top Up', or use the QCell mobile app for convenient top-ups.",
    category: "check-balance",
    order: 1,
    isActive: true,
  },
  {
    id: 7,
    title: "What should I do if I lose my phone?",
    description: "If you lose your phone, immediately contact customer care to block your SIM card. You can also dial *123# to temporarily suspend your line. Visit our nearest store with valid ID to get a replacement SIM.",
    category: "customer-care",
    order: 5,
    isActive: true,
  },
  {
    id: 8,
    title: "How do I check my data usage?",
    description: "Check your data usage by dialing *123# and selecting 'Data Usage', or through the QCell mobile app. You'll see your remaining data balance and usage history.",
    category: "check-balance",
    order: 2,
    isActive: true,
  },
]

const categories = [
  { id: "all", label: "All Questions" },
  { id: "customer-care", label: "Customer Care" },
  { id: "check-balance", label: "Check Balance" },
  { id: "buy-bundle", label: "Buy Bundle" },
]

export default function SupportFAQ() {
  const [items, setItems] = useState<SupportItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [expandedItems, setExpandedItems] = useState<Set<string | number>>(new Set())
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadSupportItems = useCallback(async () => {
    if (!mounted) return

    try {
      setLoading(true)
      
      // Fetch from backend API
      const backendItems = await api.getSupport()
      
      if (Array.isArray(backendItems) && backendItems.length > 0) {
        // Use backend items, merge with fallback if needed
        const activeBackendItems = backendItems.filter(
          (item: SupportItem) => item.isActive !== false
        )
        
        if (activeBackendItems.length > 0) {
          // Merge backend and fallback, removing duplicates
          const mergedItems = [...activeBackendItems]
          const backendIds = new Set(activeBackendItems.map((item: SupportItem) => item.id))
          
          // Add fallback items that don't exist in backend
          fallbackSupportItems.forEach((fallbackItem) => {
            if (!backendIds.has(fallbackItem.id)) {
              mergedItems.push(fallbackItem)
            }
          })
          
          // Sort by order, then by ID
          mergedItems.sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
              return a.order - b.order
            }
            return (a.id as number) - (b.id as number)
          })
          
          setItems(mergedItems)
          setLoading(false)
          return
        }
      }
      
      // Use fallback items if backend has no data
      setItems(fallbackSupportItems)
    } catch (error) {
      console.warn("Failed to load support items from backend, using fallback:", error)
      // Use fallback items on error
      setItems(fallbackSupportItems)
    } finally {
      setLoading(false)
    }
  }, [mounted])

  useEffect(() => {
    if (mounted) {
      loadSupportItems()
    }
  }, [mounted, loadSupportItems])

  const toggleItem = (id: string | number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const filteredItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory)

  if (!mounted || loading) {
    return (
      <div className="w-full py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <div className="text-gray-500">Loading FAQs...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about QCell services and support.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No FAQs found for this category.
            </div>
          ) : (
            filteredItems.map((item) => {
              const isExpanded = expandedItems.has(item.id)
              return (
                <div
                  key={item.id}
                  className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-orange-400 transition-all duration-300 shadow-sm hover:shadow-lg"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-orange-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                      {item.title}
                    </h3>
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-6 h-6 text-orange-500" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-5 pt-0">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

