/* eslint-disable */
"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { motion, AnimatePresence } from "framer-motion"
import { Wifi, Signal, Map, ChevronRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Feature, Point } from "geojson";

// Initialize Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiZGF2aWRjb250ZWgiLCJhIjoiY202OWltNXdhMDlsaDJqcjlwaGtneWhlYSJ9.xtv9kE0JHaW2H85UjUldFw"

interface CoverageArea {
  id: number
  name: string
  coordinates: [number, number]
  type: "4G" | "3G"
  signalStrength: number
  population: number
}

const coverageAreas: CoverageArea[] = [
  { id: 1, name: "Freetown", coordinates: [-13.2343, 8.4847], type: "4G", signalStrength: 95, population: 1200000 },
  { id: 2, name: "Bo", coordinates: [-11.74, 7.9647], type: "4G", signalStrength: 90, population: 174354 },
  { id: 3, name: "Kenema", coordinates: [-11.19, 7.8767], type: "4G", signalStrength: 88, population: 200354 },
  { id: 4, name: "Makeni", coordinates: [-12.0444, 8.8833], type: "4G", signalStrength: 92, population: 112489 },
  { id: 5, name: "Lunsar", coordinates: [-12.535, 8.6833], type: "3G", signalStrength: 85, population: 34000 },
  { id: 6, name: "Segbwema", coordinates: [-10.95, 7.9833], type: "3G", signalStrength: 82, population: 16889 },
  { id: 7, name: "Moyamba", coordinates: [-12.4333, 8.16], type: "3G", signalStrength: 84, population: 12000 },
  { id: 8, name: "Port Loko", coordinates: [-12.787, 8.7666], type: "4G", signalStrength: 88, population: 45000 },
  { id: 9, name: "Kambia", coordinates: [-12.9189, 9.1261], type: "3G", signalStrength: 80, population: 11000 },
  { id: 10, name: "Lungi", coordinates: [-13.205, 8.6167], type: "4G", signalStrength: 90, population: 20000 },
  { id: 11, name: "Bonthe", coordinates: [-12.505, 7.5264], type: "3G", signalStrength: 78, population: 9000 },
  { id: 12, name: "Kono", coordinates: [-10.9719, 8.6542], type: "4G", signalStrength: 86, population: 87000 },
  { id: 13, name: "Kabala", coordinates: [-11.5526, 9.5883], type: "3G", signalStrength: 82, population: 19000 },
  { id: 14, name: "Kamakwei", coordinates: [-12.2406, 9.4968], type: "3G", signalStrength: 80, population: 8000 },
  { id: 15, name: "Kailahun", coordinates: [-10.5736, 8.2783], type: "3G", signalStrength: 78, population: 14000 },
  { id: 16, name: "Pujehun", coordinates: [-11.7208, 7.3578], type: "3G", signalStrength: 76, population: 8000 },
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
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)

  const coverageStats = {
    total: coverageAreas.length,
    fourG: coverageAreas.filter((area) => area.type === "4G").length,
    threeG: coverageAreas.filter((area) => area.type === "3G").length,
    totalPopulation: coverageAreas.reduce((acc, area) => acc + area.population, 0),
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Close drawer on small screens by default
        setMobileDrawerOpen(false)
      } else {
        // Always open on larger screens
        setMobileDrawerOpen(true)
      }
    }

    // Set initial state
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!mapContainer.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11", // We'll customize this with layers
      center: [-11.7799, 8.4606],
      zoom: 7,
      pitch: 45,
      bearing: 0,
    })

    // Add custom styling to match Qcell's branding
    map.current.on("load", () => {
      setMapLoaded(true)

      // Customize map colors to match Qcell's branding
      map.current?.setPaintProperty("water", "fill-color", "#0D1117")
      map.current?.setPaintProperty("land", "background-color", "#1A1A1A")

      // Add a copper/bronze glow to the map
      map.current?.addLayer({
        id: "qcell-glow",
        type: "heatmap",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: coverageAreas.map((area) => ({
              type: "Feature",
              properties: {
                intensity: area.type === "4G" ? 1 : 0.7,
              },
              geometry: {
                type: "Point",
                coordinates: area.coordinates,
              },
            })),
          },
        },
        paint: {
          "heatmap-weight": ["get", "intensity"],
          "heatmap-intensity": 0.6,
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(205, 127, 50, 0)",
            0.2,
            "rgba(205, 127, 50, 0.2)",
            0.4,
            "rgba(205, 127, 50, 0.4)",
            0.6,
            "rgba(205, 127, 50, 0.6)",
            0.8,
            "rgba(205, 127, 50, 0.8)",
            1,
            "rgba(205, 127, 50, 1)",
          ],
          "heatmap-radius": 40,
          "heatmap-opacity": 0.7,
        },
      })

      // Add 3D terrain
      map.current?.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      })
      map.current?.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 })

      // Add coverage areas with enhanced markers
      coverageAreas.forEach((area) => {
        const el = document.createElement("div")
        el.className = `coverage-marker ${area.type.toLowerCase()}`

        // Enhanced marker with more visual impact
        el.innerHTML = `
          <div class="marker-container">
            <div class="pulse-container">
              <div class="pulse" style="animation-duration: ${3 - area.signalStrength / 50}s"></div>
              <div class="pulse pulse-delay" style="animation-duration: ${3.5 - area.signalStrength / 50}s; animation-delay: 0.5s;"></div>
            </div>
            <div class="marker-icon">${area.type}</div>
          </div>
          <div class="marker-label">${area.name}</div>
        `

        const marker = new mapboxgl.Marker(el)
          .setLngLat(area.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25, closeButton: false }).setHTML(`
              <div class="p-3">
                <h3 class="font-bold text-[#CD7F32]">${area.name}</h3>
                <p class="text-sm mb-2">${area.type} Coverage</p>
                <div class="mt-2 h-2 w-full rounded-full bg-white/20">
                  <div class="h-full rounded-full bg-[#CD7F32]" style="width: ${area.signalStrength}%"></div>
                </div>
                <p class="mt-1 text-xs">Signal Strength: ${area.signalStrength}%</p>
                <p class="mt-1 text-xs">Population: ${area.population.toLocaleString()}</p>
              </div>
            `),
          )
          .addTo(map.current!)

        // Add a click event to the marker
        el.addEventListener("click", () => {
          setSelectedArea(area)
          map.current?.flyTo({
            center: area.coordinates,
            zoom: 12,
            pitch: 60,
            bearing: 30,
            duration: 2000,
          })
        })
      })

      // Add a coverage visualization layer
      const coveragePoints: Feature<Point>[] = []
      coverageAreas.forEach((area) => {
        // Create a circle of points around each coverage area
        const radius = area.type === "4G" ? 0.2 : 0.15 // Radius in degrees
        const points = 20 // Number of points in the circle

        for (let i = 0; i < points; i++) {
          const angle = (i / points) * Math.PI * 2
          const lng = area.coordinates[0] + Math.cos(angle) * radius * (0.7 + Math.random() * 0.6)
          const lat = area.coordinates[1] + Math.sin(angle) * radius * (0.7 + Math.random() * 0.6)

          coveragePoints.push({
            type: "Feature",
            properties: {
              strength:
                area.type === "4G" ? 0.7 + (area.signalStrength / 100) * 0.3 : 0.5 + (area.signalStrength / 100) * 0.3,
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
          })
        }

        // Add the center point with full strength
        coveragePoints.push({
          type: "Feature",
          properties: {
            strength: 1,
          },
          geometry: {
            type: "Point",
            coordinates: area.coordinates,
          },
        })
      })

      // Add the coverage layer
      map.current?.addSource("coverage-areas", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: coveragePoints,
        },
      })

      map.current?.addLayer(
        {
          id: "coverage-layer",
          type: "heatmap",
          source: "coverage-areas",
          paint: {
            "heatmap-weight": ["get", "strength"],
            "heatmap-intensity": 0.8,
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(205, 127, 50, 0)",
              0.2,
              "rgba(205, 127, 50, 0.2)",
              0.4,
              "rgba(205, 127, 50, 0.4)",
              0.6,
              "rgba(205, 127, 50, 0.6)",
              0.8,
              "rgba(205, 127, 50, 0.8)",
              1,
              "rgba(205, 127, 50, 1)",
            ],
            "heatmap-radius": 30,
            "heatmap-opacity": 0.7,
          },
        },
        "qcell-glow",
      )

      // Add an initial animation to highlight coverage areas
      if (mapLoaded) {
        coverageAreas.forEach((area, index) => {
          setTimeout(() => {
            map.current?.flyTo({
              center: area.coordinates,
              zoom: 9,
              pitch: 60,
              bearing: Math.random() * 60 - 30,
              duration: 2000,
              essential: true,
            })
          }, index * 300)
        })

        // Return to overview after showcasing areas
        setTimeout(
          () => {
            map.current?.flyTo({
              center: [-11.7799, 8.4606],
              zoom: 7,
              pitch: 45,
              bearing: 0,
              duration: 3000,
            })
          },
          coverageAreas.length * 300 + 1000,
        )
      }
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [mapLoaded])

  useEffect(() => {
    if (mapLoaded) {
      coverageAreas.forEach((area, index) => {
        setTimeout(() => {
          map.current?.flyTo({
            center: area.coordinates,
            zoom: 9,
            pitch: 60,
            bearing: Math.random() * 60 - 30,
            duration: 2000,
            essential: true,
          })
        }, index * 300)
      })

      // Return to overview after showcasing areas
      setTimeout(
        () => {
          map.current?.flyTo({
            center: [-11.7799, 8.4606],
            zoom: 7,
            pitch: 45,
            bearing: 0,
            duration: 3000,
          })
        },
        coverageAreas.length * 300 + 1000,
      )
    }
  }, [mapLoaded])

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-xl bg-[#1a1a1a]">
      <style jsx global>{`
        .coverage-marker {
          width: 30px;
          height: 30px;
          position: relative;
          cursor: pointer;
          z-index: 2;
        }

        .coverage-marker .marker-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .coverage-marker .pulse-container {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .coverage-marker .marker-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #CD7F32;
          color: white;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          z-index: 3;
          box-shadow: 0 0 10px rgba(205, 127, 50, 0.8);
        }

        .coverage-marker .marker-label {
          position: absolute;
          left: 50%;
          bottom: 100%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
          z-index: 4;
        }

        .coverage-marker:hover .marker-label {
          opacity: 1;
        }

        .coverage-marker.4g .marker-icon {
          background: #CD7F32;
          box-shadow: 0 0 15px rgba(205, 127, 50, 0.9);
        }

        .coverage-marker.3g .marker-icon {
          background: #B87333;
          box-shadow: 0 0 12px rgba(184, 115, 51, 0.8);
        }

        .pulse {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          animation: pulse 2s ease-out infinite;
        }

        .pulse-delay {
          animation-delay: 0.5s;
        }

        .coverage-marker.4g .pulse {
          background: rgba(205, 127, 50, 0.8);
        }

        .coverage-marker.3g .pulse {
          background: rgba(184, 115, 51, 0.8);
        }

        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        .mapboxgl-popup-content {
          background: rgba(26, 26, 26, 0.95) !important;
          color: white;
          border-radius: 8px;
          padding: 12px;
          font-family: system-ui, -apple-system, sans-serif;
          border: 1px solid rgba(205, 127, 50, 0.4);
          box-shadow: 0 0 20px rgba(205, 127, 50, 0.3);
        }

        .mapboxgl-popup-tip {
          border-top-color: rgba(26, 26, 26, 0.95) !important;
          border-bottom-color: rgba(26, 26, 26, 0.95) !important;
        }
      `}</style>

      {/* Desktop title */}
      <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-8 text-white hidden md:block">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold">
          With Qcell, <br />
          <span className="relative bg-gradient-to-r from-[#CD7F32] to-[#B87333] bg-clip-text text-transparent">
            You&apos;re always{" "}
            <span className="after:absolute after:w-[42%] after:h-1/6 after:bg-white after:right-0 after:-bottom-1">
              connected
            </span>
          </span>
        </motion.h1>
      </div>

      {/* Mobile title - more compact */}
      <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4 text-white md:hidden">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold">
          <span className="relative bg-gradient-to-r from-[#CD7F32] to-[#B87333] bg-clip-text text-transparent">
            Qcell Coverage
          </span>
        </motion.h1>
      </div>

      {/* Mobile drawer handle - only visible on small screens */}
      <div
        className="md:hidden absolute bottom-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm p-2 flex justify-center cursor-pointer"
        onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
      >
        <div className="w-12 h-1 bg-white/30 rounded-full" />
        <div className="absolute right-4 top-2">
          {mobileDrawerOpen ? (
            <ChevronDown className="h-5 w-5 text-white/60" />
          ) : (
            <ChevronRight className="h-5 w-5 text-white/60" />
          )}
        </div>
      </div>

      {/* Responsive sidebar/drawer */}
      <motion.div
        className={`absolute z-10 bg-black/80 backdrop-blur-sm overflow-y-auto
          md:inset-y-0 md:right-0 md:w-80 md:sm:w-96
          ${
            mobileDrawerOpen ? "inset-x-0 bottom-0 rounded-t-xl max-h-[70vh]" : "inset-x-0 bottom-0 h-0 overflow-hidden"
          }`}
        animate={{
          height: mobileDrawerOpen ? "auto" : "40px",
          y: mobileDrawerOpen ? 0 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6">
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
                  <h3 className="text-lg font-semibold text-white">Coverage Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white/10 p-4">
                      <div className="text-2xl font-bold text-[#CD7F32]">{coverageStats.total}</div>
                      <div className="text-sm text-white/60">Coverage Areas</div>
                    </div>
                    <div className="rounded-lg bg-white/10 p-4">
                      <div className="text-2xl font-bold text-[#CD7F32]">
                        {(coverageStats.totalPopulation / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-white/60">People Covered</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Signal className="h-4 w-4 text-[#CD7F32]" />
                        <span className="text-sm text-white/80">4G Coverage</span>
                      </div>
                      <span className="font-mono text-sm text-white/60">{coverageStats.fourG} areas</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-[#B87333]" />
                        <span className="text-sm text-white/80">3G Coverage</span>
                      </div>
                      <span className="font-mono text-sm text-white/60">{coverageStats.threeG} areas</span>
                    </div>
                  </div>
                </div>

                {selectedArea && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg bg-white/10 p-4"
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
                          <span className="text-white/60">Signal Strength</span>
                          <span className="font-mono text-white">{selectedArea.signalStrength}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${selectedArea.signalStrength}%` }}
                            transition={{ duration: 1, type: "spring" }}
                            className="h-full bg-[#CD7F32]"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Population Covered</span>
                        <span className="font-mono text-white">{selectedArea.population.toLocaleString()} people</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowList(true)}
                  className="w-full rounded-lg bg-[#CD7F32] px-4 py-2 text-sm font-medium text-white transition-colors overflow-hidden hover:bg-[#CD7F32]/90"
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
                      className="flex w-full items-center justify-between rounded-lg bg-white/10 p-4 text-left transition-colors hover:bg-white/20"
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
      </motion.div>

      {/* Add a legend to the map */}
      <div className="absolute bottom-16 md:bottom-4 left-4 z-10 bg-black/80 p-3 rounded-lg backdrop-blur-sm">
        <h4 className="text-white text-sm font-medium mb-2">Coverage Legend</h4>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-4 h-4 rounded-full bg-[#CD7F32]"></div>
          <span className="text-white/80 text-xs">4G Coverage</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#B87333]"></div>
          <span className="text-white/80 text-xs">3G Coverage</span>
        </div>
      </div>

      {/* Mobile floating action button */}
      <div className="md:hidden absolute bottom-16 right-4 z-10 flex flex-col gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMobileDrawerOpen(true)
            setActiveTab("map")
          }}
          className={`rounded-full p-3 shadow-lg ${activeTab === "map" ? "bg-[#CD7F32]" : "bg-black/70"}`}
        >
          <Map className="h-5 w-5 text-white" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setMobileDrawerOpen(true)
            setActiveTab("list")
          }}
          className={`rounded-full p-3 shadow-lg ${activeTab === "list" ? "bg-[#CD7F32]" : "bg-black/70"}`}
        >
          <Signal className="h-5 w-5 text-white" />
        </motion.button>
      </div>

      <div ref={mapContainer} className="h-full w-full" />

      <AnimatePresence>
        {showList && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="absolute inset-0 z-20 overflow-y-auto bg-black/95 p-8 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Roaming Partners</h2>
              <button
                onClick={() => setShowList(false)}
                className="rounded-full bg-white/10 p-2 text-white/60 hover:bg-white/20 hover:text-white"
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
                  className="rounded-lg bg-white/10 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">{partner.flag}</div>
                    <div>
                      <h3 className="font-medium text-white">{partner.country}</h3>
                      <p className="mt-1 text-sm text-white/60">{partner.operator}</p>
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