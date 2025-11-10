/* eslint-disable */
"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, Signal, Map, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Initialize Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiZGF2aWRjb250ZWgiLCJhIjoiY202OWltNXdhMDlsaDJqcjlwaGtneWhlYSJ9.xtv9kE0JHaW2H85UjUldFw";

interface CoverageArea {
  id: number
  name: string
  coordinates: [number, number]
  type: "4G" | "3G"
  signalStrength: number
  population: number
}

// Province color mapping
const provinceColors: Record<string, string> = {
  "Western Area": "#CD7F32",
  "Northern": "#1E90FF",
  "Southern": "#43A047",
  "Eastern": "#F9A825",
  "North-Western": "#8E24AA",
}

// All 16 districts with province info
const coverageAreas: (CoverageArea & { province: string })[] = [
  { id: 1, name: "Western Area Urban (Freetown)", coordinates: [-13.2343, 8.4847], type: "4G", signalStrength: 95, population: 1200000, province: "Western Area" },
  { id: 2, name: "Western Area Rural", coordinates: [-13.2, 8.4], type: "4G", signalStrength: 90, population: 442951, province: "Western Area" },
  { id: 3, name: "Bo", coordinates: [-11.74, 7.9647], type: "4G", signalStrength: 90, population: 574201, province: "Southern" },
  { id: 4, name: "Bonthe", coordinates: [-12.505, 7.5264], type: "3G", signalStrength: 78, population: 200781, province: "Southern" },
  { id: 5, name: "Moyamba", coordinates: [-12.4333, 8.16], type: "3G", signalStrength: 84, population: 318588, province: "Southern" },
  { id: 6, name: "Pujehun", coordinates: [-11.7208, 7.3578], type: "3G", signalStrength: 76, population: 345577, province: "Southern" },
  { id: 7, name: "Kenema", coordinates: [-11.19, 7.8767], type: "4G", signalStrength: 88, population: 609891, province: "Eastern" },
  { id: 8, name: "Kailahun", coordinates: [-10.5736, 8.2783], type: "3G", signalStrength: 78, population: 525372, province: "Eastern" },
  { id: 9, name: "Kono", coordinates: [-10.9719, 8.6542], type: "4G", signalStrength: 86, population: 505491, province: "Eastern" },
  { id: 10, name: "Bombali", coordinates: [-12.0444, 8.8833], type: "4G", signalStrength: 92, population: 606544, province: "Northern" },
  { id: 11, name: "Koinadugu", coordinates: [-11.5526, 9.5883], type: "3G", signalStrength: 82, population: 409372, province: "Northern" },
  { id: 12, name: "Tonkolili", coordinates: [-11.95, 8.7], type: "4G", signalStrength: 85, population: 530776, province: "Northern" },
  { id: 13, name: "Falaba", coordinates: [-11.2833, 9.6667], type: "3G", signalStrength: 80, population: 205353, province: "Northern" },
  { id: 14, name: "Kambia", coordinates: [-12.9189, 9.1261], type: "3G", signalStrength: 80, population: 345474, province: "North-Western" },
  { id: 15, name: "Port Loko", coordinates: [-12.787, 8.7666], type: "4G", signalStrength: 88, population: 614063, province: "North-Western" },
  { id: 16, name: "Karene", coordinates: [-12.5, 9.1], type: "3G", signalStrength: 82, population: 285546, province: "North-Western" },
]

interface RoamingPartner {
  id: number
  country: string
  flag: string
  operator: string
}

const roamingPartners: RoamingPartner[] = [
  {
    id: 1,
    country: "United Arab Emirates",
    flag: "🇦🇪",
    operator: "'DU'-Emirate Integrated Telecommunicatios Company PJSC",
  },
  { id: 2, country: "Lebanon", flag: "🇱🇧", operator: "Mobile Interim Company 1 (MIC1)" },
  { id: 3, country: "South Africa", flag: "🇿🇦", operator: "MTN PTY LTD" },
  { id: 4, country: "Kenya", flag: "🇰🇪", operator: "Airtel Network Kenya Limited (ex-Celtel Kenya LTD.'Zain')" },
  {
    id: 5,
    country: "Ethiopia",
    flag: "🇪🇹",
    operator: "Ethio Telecom 'ETC' (Ex-ethiopia Telecommunications Corporation)",
  },
  { id: 6, country: "Morocco", flag: "🇲🇦", operator: "Maroc Telecom Iam" },
  { id: 7, country: "Guinea", flag: "🇬🇳", operator: "MTN" },
  { id: 8, country: "Senegal", flag: "🇸🇳", operator: "Orange (Sonatel Mobiles)" },
  { id: 9, country: "Mali", flag: "🇲🇱", operator: "Orange (Ex-ikatel)" },
  { id: 10, country: "Rwanda", flag: "🇷🇼", operator: "MTN-Rwandacell" },
  { id: 11, country: "Germany", flag: "🇩🇪", operator: "Telekom Deutschland GMBH (Ex-T-mobile Deutschland GMBH)" },
  { id: 12, country: "Switzerland", flag: "🇨🇭", operator: "Swisscom Mobile (Ex-Telecom Fl)" },
  { id: 13, country: "France", flag: "🇫🇷", operator: "Orange France" },
  { id: 14, country: "Italy", flag: "🇮🇹", operator: "Vodafone Omnitel" },
  { id: 15, country: "Sweden", flag: "🇸🇪", operator: "Tele2 Sverige AB" },
  { id: 16, country: "Spain", flag: "🇪🇸", operator: "Vodafone" },
  { id: 17, country: "Poland", flag: "🇵🇱", operator: "Orange (Ex-PTK Centertel SP Z.O.O.)" },
  { id: 18, country: "Romania", flag: "🇷🇴", operator: "Vodafone Romania SA" },
  { id: 19, country: "Cyprus", flag: "🇨🇾", operator: "Epic MTN Areeba Ltd" },
  { id: 20, country: "Norway", flag: "🇳🇴", operator: "Telenor Mobile" },
  { id: 21, country: "Denmark", flag: "🇩🇰", operator: "Telia Mobile" },
  { id: 22, country: "Israel", flag: "🇮🇱", operator: "Cellcom Israel Ltd" },
  { id: 23, country: "Tanzania", flag: "🇹🇿", operator: "Vodacom Tanzania" },
  { id: 24, country: "Algeria", flag: "🇩🇿", operator: "ATM Mobilis Ex-PTT Algeria" },
  { id: 25, country: "South Korea", flag: "🇰🇷", operator: "SK Telecom" },
  { id: 26, country: "Japan", flag: "🇯🇵", operator: "SoftBank Mobile (ex Vodafone kk,ex-J-Phone)" },
  { id: 27, country: "Colombia", flag: "🇨🇴", operator: "Telefonica Moviles" },
  { id: 28, country: "Canada", flag: "🇨🇦", operator: "Telus Communications Company" },
  { id: 29, country: "Netherlands", flag: "🇳🇱", operator: "T-Mobile Netherlands BV." },
  { id: 30, country: "Oman", flag: "🇴🇲", operator: "Omantel (Oman Telecommunications Company S.A.O.C.)" },
  { id: 31, country: "Kuwait", flag: "🇰🇼", operator: "Zain & MTN (Mobile Telecommunications Company)" },
  { id: 32, country: "Egypt", flag: "🇪🇬", operator: "Orange & Mobinil" },
  { id: 33, country: "Ivory Coast", flag: "🇨🇮", operator: "MTN & MOOV" },
  { id: 34, country: "Liberia", flag: "🇱🇷", operator: "MTN & Liberia Telecommunications Corporation (Libtelco)" },
  { id: 35, country: "China", flag: "🇨🇳", operator: "China Unicom Corporation Ltd" },
  { id: 36, country: "India", flag: "🇮🇳", operator: "Bharti Airtel India" },
  { id: 37, country: "Ghana", flag: "🇬🇭", operator: "MTN, Ghana, AREEBA (Ex-SCANCOM_SPACEFON)" },
  { id: 38, country: "Nigeria", flag: "🇳🇬", operator: "MTN Communications Ltd" },
  { id: 39, country: "USA", flag: "🇺🇸", operator: "AT&T" },
  { id: 40, country: "UK", flag: "🇬🇧", operator: "Vodafone" },
  { id: 41, country: "Iceland", flag: "🇮🇸", operator: "Nova" },
  { id: 42, country: "Australia", flag: "🇦🇺", operator: "VODAFONE NETWORK PTY LT" },
  { id: 43, country: "Austria", flag: "🇦🇹", operator: "T-MOBILE AUSTRIA GMBH" },
  { id: 44, country: "Bangladesh", flag: "🇧🇩", operator: "GRAMEENPHONE LIMITED" },
  { id: 45, country: "Belgium", flag: "🇧🇪", operator: "PROXIMUS" },
  { id: 46, country: "Gambia", flag: "🇬🇲", operator: "QCELL" },
  { id: 47, country: "Saudi Arabia", flag: "🇸🇦", operator: "ETIHAD ETISALAT CO - MOBILY" },
  { id: 48, country: "Turkey", flag: "🇹🇷", operator: "TURKCELL ILETISIM HIZMETLERI AS" },
  { id: 49, country: "Pakistan", flag: "🇵🇰", operator: "VEON JAZZ MOBILINK" },
  { id: 50, country: "Russia", flag: "🇷🇺", operator: "MTS" },
  { id: 51, country: "Sudan", flag: "🇸🇩", operator: "MTN SUDAN CO. LTD" },
  { id: 52, country: "Libya", flag: "🇱🇾", operator: "LIBYANA MOBILE PHONE" },
  { id: 53, country: "Iraq", flag: "🇮🇶", operator: "ZAIN (ex-ATHEER)" },
  { id: 54, country: "Azerbaijan", flag: "🇦🇿", operator: "BAKCELL" },
  { id: 55, country: "Benin", flag: "🇧🇯", operator: "MTN" },
  { id: 56, country: "Cape Verde", flag: "🇨🇻", operator: "UNITEL" },
  { id: 57, country: "Togo", flag: "🇹🇬", operator: "MOOV AFRICA" },
  { id: 58, country: "Guinea Bissau", flag: "🇬🇼", operator: "ORANGE" },
]

export default function EnhancedCoverageMap() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [selectedArea, setSelectedArea] = useState<CoverageArea | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [showList, setShowList] = useState(false)
  const [activeTab, setActiveTab] = useState<"map" | "list">("map")

  const coverageStats = {
    total: coverageAreas.length,
    fourG: coverageAreas.filter((area) => area.type === "4G").length,
    threeG: coverageAreas.filter((area) => area.type === "3G").length,
    totalPopulation: coverageAreas.reduce((acc, area) => acc + area.population, 0),
  }

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11", // Lighter style for better contrast
      center: [-11.7799, 8.4606],
      zoom: 7.2, // Slightly zoomed out to fit all districts
      pitch: 45,
      bearing: 0,
      maxBounds: [
        [-14, 6.5],
        [-10, 10.5],
      ],
    })

    map.current.on("load", () => {
      setMapLoaded(true)

      // Add 3D terrain
      map.current?.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      })
      map.current?.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })

      // Add coverage areas
      coverageAreas.forEach((area) => {
        const el = document.createElement("div")
        el.className = `coverage-marker ${area.type.toLowerCase()} province-${area.province.replace(/\s/g, "-")}`
        el.innerHTML = `
          <div class="pulse" style="background: ${provinceColors[area.province]}; animation-duration: ${3 - area.signalStrength / 50}s"></div>
          <div class="marker-label">${area.name}<br/><span style='font-size:10px;color:${provinceColors[area.province]};'>${area.province} Province</span></div>
        `

        new mapboxgl.Marker(el)
          .setLngLat(area.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div class="p-2">
                <h3 class="font-bold">${area.name}</h3>
                <p class="text-sm">${area.type} Coverage</p>
                <p class="text-xs" style="color:${provinceColors[area.province]}">${area.province} Province</p>
                <div class="mt-2 h-2 w-full rounded-full bg-white/20">
                  <div class="h-full rounded-full" style="background:${provinceColors[area.province]};width: ${area.signalStrength}%"></div>
                </div>
                <p class="mt-1 text-xs">Signal Strength: ${area.signalStrength}%</p>
              </div>
            `),
          )
          .addTo(map.current!)

        el.addEventListener("click", () => {
          setSelectedArea(area)
          map.current?.flyTo({
            center: area.coordinates,
            zoom: 11.5,
            pitch: 60,
            bearing: 30,
            duration: 2000,
          })
        })
      })
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-white via-[#f7f7f7] to-[#e6e6e6]">
      <style jsx global>{`
        .coverage-marker {
          width: 22px;
          height: 22px;
          position: relative;
          cursor: pointer;
        }
        .coverage-marker .marker-label {
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #333;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 13px;
          white-space: nowrap;
          opacity: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .coverage-marker:hover .marker-label {
          opacity: 1;
        }
        .pulse {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          position: relative;
          animation: pulse 2s ease-out infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .mapboxgl-popup-content {
          background: rgba(255,255,255,0.98) !important;
          color: #333;
          border-radius: 10px;
          padding: 14px;
          font-family: system-ui, -apple-system, sans-serif;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
        }
      `}</style>

      <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#fff]/90 to-transparent p-8 text-[#CD7F32] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
          With Qcell,{" "}
          <br />
          <span className="relative bg-gradient-to-r from-[#CD7F32] to-[#B87333] bg-clip-text text-transparent">
            You&apos;re always <span className="after:absolute after:w-[42%] after:h-1/6 after:bg-[#CD7F32] after:right-0 after:-bottom-1">connected</span>
          </span>
        </motion.h1>
        {/* Province legend */}
        <div className="flex flex-wrap gap-3 items-center bg-white/80 rounded-lg px-4 py-2 border border-[#CD7F32]/20 shadow-sm">
          <span className="font-semibold text-[#B87333] text-sm mr-2">Provinces:</span>
          {Object.entries(provinceColors).map(([province, color]) => (
            <span key={province} className="flex items-center gap-1 text-xs font-medium" style={{ color }}>
              <span style={{ background: color, width: 12, height: 12, borderRadius: '50%', display: 'inline-block', marginRight: 4, border: '1.5px solid #fff' }}></span>
              {province}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 right-0 z-10 w-80 sm:w-96 bg-white/90 p-6 shadow-xl backdrop-blur-md overflow-y-auto border-l border-[#CD7F32]/20">
        <div className="mb-6 flex gap-4 sticky">
          <button
            onClick={() => setActiveTab("map")}
            className={cn(
              "flex-1 sticky rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "map"
                ? "bg-[#CD7F32] text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white",
            )}
          >
            <Map className="mr-2 inline-block h-4 w-4" />
            Map View
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={cn(
              "flex-1 sticky rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeTab === "list"
                ? "bg-[#CD7F32] text-white"
                : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white",
            )}
          >
            <Signal className="mr-2 inline-block h-4 w-4" />
            Coverage List
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "map" ? (
            <motion.div
              key="map-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#CD7F32]">Coverage Statistics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-[#FFF7ED] p-4 border border-[#CD7F32]/20">
                    <div className="text-2xl font-bold text-[#CD7F32]">{coverageStats.total}</div>
                    <div className="text-sm text-[#B87333]">Coverage Areas</div>
                  </div>
                  <div className="rounded-lg bg-[#FFF7ED] p-4 border border-[#CD7F32]/20">
                    <div className="text-2xl font-bold text-[#CD7F32]">
                      {(coverageStats.totalPopulation / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-[#B87333]">People Covered</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Signal className="h-4 w-4 text-[#CD7F32]" />
                    <span className="text-sm text-[#CD7F32]">4G Coverage</span>
                  </div>
                  <span className="font-mono text-sm text-[#B87333]">{coverageStats.fourG} areas</span>
                  </div>
                  <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-[#B87333]" />
                    <span className="text-sm text-[#B87333]">3G Coverage</span>
                  </div>
                  <span className="font-mono text-sm text-[#CD7F32]">{coverageStats.threeG} areas</span>
                  </div>
                </div>
              </div>

              {selectedArea && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-[#FFF7ED] p-4 border border-[#CD7F32]/20"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{selectedArea.name}</h3>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs font-medium",
                        selectedArea.type === "4G"
                          ? "bg-[#CD7F32]/20 text-[#CD7F32]"
                          : "bg-[#B87333]/20 text-[#B87333]",
                      )}
                    >
                      {selectedArea.type}
                    </span>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-[#B87333]">Signal Strength</span>
                        <span className="font-mono text-[#CD7F32]">{selectedArea.signalStrength}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-[#F7E6D7]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedArea.signalStrength}%` }}
                          transition={{ duration: 1, type: "spring" }}
                          className="h-full bg-gradient-to-r from-[#CD7F32] to-[#B87333]"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#B87333]">Population Covered</span>
                      <span className="font-mono text-[#CD7F32]">{selectedArea.population.toLocaleString()} people</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowList(true)}
                className="w-full rounded-lg bg-gradient-to-r from-[#CD7F32] to-[#B87333] px-4 py-2 text-sm font-medium text-white transition-colors overflow-hidden hover:from-[#B87333] hover:to-[#CD7F32]"
              >
                List of Roaming Partners
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="list-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                {coverageAreas.map((area) => (
                  <motion.button
                    key={area.id}
                    onClick={() => {
                      setSelectedArea(area)
                      setActiveTab("map")
                      map.current?.flyTo({
                        center: area.coordinates,
                        zoom: 12,
                        pitch: 60,
                        bearing: 30,
                        duration: 2000,
                      })
                    }}
                    className="flex w-full items-center justify-between rounded-lg bg-[#FFF7ED] border border-[#CD7F32]/20 p-4 text-left transition-colors hover:bg-[#F7E6D7]"
                  >
                    <div>
                      <h3 className="font-medium text-white">{area.name}</h3>
                      <p className="text-sm text-white/60">{area.type} Coverage</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/40" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div ref={mapContainer} className="h-full w-full rounded-xl shadow-lg border border-[#CD7F32]/10" />

      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="absolute inset-0 z-20 overflow-y-auto bg-white/95 p-8 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#CD7F32]">Roaming Partners</h2>
              <button
                onClick={() => setShowList(false)}
                className="rounded-full bg-[#FFF7ED] p-2 text-[#B87333] hover:bg-[#F7E6D7] hover:text-[#CD7F32] border border-[#CD7F32]/20"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roamingPartners.map((partner, i) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-lg bg-[#FFF7ED] border border-[#CD7F32]/20 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{partner.flag}</div>
                    <div>
                      <h3 className="font-medium text-[#CD7F32]">{partner.country}</h3>
                      <p className="mt-1 text-sm text-[#B87333]">{partner.operator}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}