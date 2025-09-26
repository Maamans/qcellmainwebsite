"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TariffNavigationProps {
  activeTab: string
}

export default function TariffNavigation({ activeTab }: TariffNavigationProps) {
  const [activeSubTab, setActiveSubTab] = useState<string>(() => {
    // Set default sub-tab based on active main tab
    if (activeTab === "Voice Tariffs") return "Voice Tariffs"
    if (activeTab === "Data Bundles") return "Data Bundles"
    if (activeTab === "Combo Bundles") return "Combo Bundles"
    return ""
  })

  const tabs = ["Voice Tariffs", "Data Bundles", "Combo Bundles", "Value Added Services", "eSIM", "5G"]

  const getSubTabs = (tab: string) => {
    switch (tab) {
      case "Voice Tariffs":
        return ["Voice Tariffs", "International tariffs"]
      case "Data Bundles":
        return ["Data Bundles", "Roaming Bundles"]
      case "Combo Bundles":
        return []
      default:
        return []
    }
  }

  const subTabs = getSubTabs(activeTab)

  return (
    <div className="w-full bg-white border-b">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="py-4 text-gray-500 text-sm">
          <Link href="/" className="hover:text-gray-700">
            HOME
          </Link>{" "}
          /{" "}
          <Link href="/services" className="hover:text-gray-700">
            SERVICES
          </Link>
        </div>

        {/* Main Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <Link
              key={tab}
              href={`/tariffs/${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={cn(
                "px-4 py-3 whitespace-nowrap font-medium border-b-2 transition-colors",
                activeTab === tab
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-400 hover:text-gray-600",
              )}
            >
              {tab}
            </Link>
          ))}
        </div>

        {/* Sub Tabs (if any) */}
        {subTabs.length > 0 && (
          <div className="bg-gray-100 px-4 py-2 flex">
            {subTabs.map((subTab) => (
              <button
                key={subTab}
                onClick={() => setActiveSubTab(subTab)}
                className={cn(
                  "px-4 py-2 font-medium text-sm",
                  activeSubTab === subTab ? "text-purple-600" : "text-gray-500 hover:text-gray-700",
                )}
              >
                {subTab}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
