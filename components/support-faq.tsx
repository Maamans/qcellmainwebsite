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
// These are the default questions and answers shown on the Support page.
const fallbackSupportItems: SupportItem[] = [
  {
    id: 1,
    title: "How much is a QCell SIM card?",
    description:
      "A QCell SIM Card costs NLe10. Just visit a QCell Customer Care Centre with a valid national ID (such as National ID card, International Passport, Driver's Licence or Voter's card) for SIM card registration.",
    category: "customer-care",
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    title: "Why do I have to register my QCell line?",
    description:
      "It is a mandate from the Government of Sierra Leone to register all SIM cards for security reasons and to reduce phone‑related crime.",
    category: "customer-care",
    order: 2,
    isActive: true,
  },
  {
    id: 3,
    title: "What documents do I need to register my QCell SIM card?",
    description:
      "You will need an International Passport, a National ID card, Driver's Licence or Voter's card. Non‑Sierra Leoneans can use their International Passport to register.",
    category: "customer-care",
    order: 3,
    isActive: true,
  },
  {
    id: 4,
    title: "How do I know that my data bundle is about to expire?",
    description:
      "Dial *303# and reply with option 5 (Check Balance) to see your bundle status and validity. You can also dial *101# for information on your main account balance.",
    category: "check-balance",
    order: 1,
    isActive: true,
  },
  {
    id: 5,
    title: "What happens when my data bundle expires?",
    description:
      "Bundles have different validity periods from the date of purchase. When your bundle expires and you still have credit, dial *303#, reply with 1 to buy bundle, then choose 2 for data bundle and select the bundle of your choice to continue browsing.",
    category: "buy-bundle",
    order: 2,
    isActive: true,
  },
  {
    id: 6,
    title: "Can I continue using the internet with my credit when I exhaust my data bundle?",
    description:
      "No. You will not be able to continue browsing when your data bundle is exhausted. You must subscribe to another bundle by dialing *303#, replying with 1 to buy bundle, then choosing 2 for data bundle and selecting your preferred bundle.",
    category: "buy-bundle",
    order: 3,
    isActive: true,
  },
  {
    id: 7,
    title: "How can I subscribe to Tok Boku Bundle?",
    description:
      "Dial *303#, reply with 1 to buy bundle, then choose 1 for Tok Boku Bundle and select the bundle of your choice.",
    category: "buy-bundle",
    order: 4,
    isActive: true,
  },
  {
    id: 8,
    title: "How can I subscribe to Qnite?",
    description:
      "Dial *303#, reply with 3, then press 1 to confirm Qnite subscription. Note: subscription MUST be done after midnight (12:00am).",
    category: "buy-bundle",
    order: 5,
    isActive: true,
  },
  {
    id: 9,
    title: "I subscribed to Qnite but I cannot access the internet, even after 12:00am. Why?",
    description:
      "You can only enjoy Qnite unlimited internet browsing between 12:00am and 7:00am. Outside this time window, Qnite will not be active and you will need a regular data bundle to browse.",
    category: "customer-care",
    order: 6,
    isActive: true,
  },
  {
    id: 10,
    title: "How can I enjoy 4G LTE on my device?",
    description:
      "First, your device must be 4G‑enabled. Then dial *335# and reply with 1 to self‑activate 4G LTE. Go to your data settings and select 4G or LTE (you may also keep it on Auto). Finally, switch your mobile data off and on again.",
    category: "customer-care",
    order: 7,
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

