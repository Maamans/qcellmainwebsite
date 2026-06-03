"use client"

import { useEffect, useState, useRef } from "react"
import shopsData from "../../data/shops.json"
import Navigation from "@/components/navigation-two"

import Footer from "@/components/footer"

import { motion } from "framer-motion"



const customerCareShops = [

  "Deaf School, Wilkinson Road, Freetown",

  "8 Wilberforce Street, Freetown",

  "26A Kingharman Road, Freetown",

  "59 Bai Bureh Road, Kissy Shell, Freetown",

  "109 Lumpa Road, Waterloo",

  "Aberdeen Beach Road (Adjacent to Warehouse)",

  "Brookfields (Bus Halt), Freetown",

  "31A Liverpool Street, Freetown",

  "6 Bojon Street, Bo",

  "29 Mabanta Road, Makeni",

  "20 Blama Road, Jacoba Junction, Kenema",

  "New England Ville (Police Post), Freetown",

  "Mofindor Road, Kailahun",

  "Konomani Road, Koidu",

  "Lungi Airport",

  "Lungi Port Loko Road (Lungi)",

  "10 Bomboli Street, Masiaka",

  "1 Sawaneh Street, Moyamba",

]



const howToCodes = [

  { label: "Check main voice balance", code: "*101#" },

  { label: "Buy Bundle", code: "*303#" },

  { label: "Know your Number", code: "*160#" },

  { label: "Transfer Credit", code: "*141*Number*Amount#" },

  { label: "Loan Credit", code: "*393#" },

  { label: "Send Please Call Me", code: "*444*Number#" },

  { label: "Access QPower", code: "*363#" },

  { label: "Access last call info", code: "*102#" },

  { label: "Self activate 4G LTE", code: "*335#" },

  { label: "Access all short codes", code: "*343#" },

]

export default function CustomerCareShopsPage() {
  const [status, setStatus] = useState<'idle' | 'locating' | 'ready' | 'error'>('idle')
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null)
  const [nearest, setNearest] = useState<any[]>([])
  const [error, setError] = useState<string>('')

  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const leafletRef = useRef<any>(null)

  useEffect(() => {
    // Log Permissions-Policy header on mount to verify geolocation is allowed
    if (typeof window !== 'undefined') {
      console.log('Page loaded, checking permissions...')
      // Check if geolocation is available
      if ('geolocation' in navigator) {
        console.log('Geolocation is available in navigator')
      } else {
        console.error('Geolocation is NOT available in navigator')
      }
    }
  }, [])

  // Initialize map and shop markers (runs once)
  useEffect(() => {
    // dynamically import Leaflet on client only to avoid SSR errors
    const load = async () => {
      const L = (await import('leaflet')).default

      // add Leaflet CSS if not present
      if (!document.querySelector('link[data-leaflet]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css'
        link.setAttribute('data-leaflet', 'true')
        document.head.appendChild(link)
      }

      leafletRef.current = L

      // fix default icon urls in Next.js
      try {
        // @ts-ignore
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })
      } catch (e) {}

      const container = document.getElementById('shops-map')
      if (!container) return

      const m = L.map(container, { center: [8.4606, -11.7799], zoom: 8, scrollWheelZoom: false })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(m)

      shopsData.forEach((s: any) => {
        const marker = L.marker([s.latitude, s.longitude]).addTo(m).bindPopup(`<b>${s.name}</b><br/>${s.address}`)
        markersRef.current.push(marker)
      })

      mapRef.current = m
    }

    load()

    return () => {
      if (mapRef.current) {
        markersRef.current.forEach((mk) => mk.remove())
        markersRef.current = []
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  async function fetchNearest(lat: number, lng: number) {
    try {
      console.log('Fetching nearest shops for:', lat, lng)
      const res = await fetch('/api/public/shops-nearest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat, lng, limit: 1 }),
      })
      const data = await res.json()
      console.log('API Response:', res.ok, data)
      if (res.ok) {
        console.log('Setting nearest shops:', data)
        setNearest(data)
        // highlight nearest on map
        if (mapRef.current) {
          // remove existing user marker if any
          markersRef.current.forEach((m) => m.closePopup())
          if (data && data.length > 0) {
            const first = data[0]
            try {
              mapRef.current.flyTo([first.latitude, first.longitude], 12, { duration: 1.2 })
            } catch (e) {}
          }
        }
      } else {
        console.error('API Error:', data)
        setError(data?.error || 'Failed to fetch nearest shops')
      }
    } catch (e: any) {
      console.error('Fetch error:', e)
      setError(e?.message || String(e))
    }
  }

  function requestLocationFromUser() {
    if (!('geolocation' in navigator)) {
      setError('Geolocation not supported')
      return
    }
    console.log('Requesting geolocation...')
    setStatus('locating')
    setError('')
    setNearest([])
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const accuracy = pos.coords.accuracy
        console.log('Got position:', lat, lng, 'accuracy:', accuracy)
        setCoords({ lat, lng, accuracy })
        setStatus('ready')
        const lowAccuracyThreshold = 100
        const lowAccuracy = accuracy != null && accuracy > lowAccuracyThreshold
        if (lowAccuracy) {
          setError(
            'Location accuracy is low (' + accuracy?.toFixed(0) + ' m). ' +
            'Nearest shop will not be selected because the position is too imprecise. ' +
            'Please try again outdoors or use a device with better GPS.'
          )
        } else {
          setError('')
        }
        // show user marker
        if (mapRef.current) {
          const L = leafletRef.current
          if (L) {
            const userMarker = L.circleMarker([lat, lng], { radius: 8, color: '#2563EB', fillColor: '#3B82F6', fillOpacity: 0.9 }).addTo(mapRef.current)
            userMarker.bindPopup('You are here').openPopup()
            markersRef.current.push(userMarker as any)
            mapRef.current.flyTo([lat, lng], 12, { duration: 1.2 })
          }
        }
        if (!lowAccuracy) {
          fetchNearest(lat, lng)
        }
      },
      (err) => {
        console.error('Geolocation error object:', err)
        console.error('Error code:', err?.code)
        console.error('Error message:', err?.message)
        const errorMap: Record<number, string> = {
          1: 'Location access denied. Please:\n1. Click the lock icon in address bar\n2. Enable "Location" permission\n3. Click "Use my location" again',
          2: 'Position unavailable - please try again',
          3: 'Request timeout - please try again'
        }
        const msg = err?.code ? errorMap[err.code] : 'Location access denied. Please check browser permissions.'
        console.error('Final error message:', msg)
        setError(msg)
        setStatus('error')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  function flyToShop(s: any) {
    if (!mapRef.current) return
    try {
      mapRef.current.flyTo([s.latitude, s.longitude], 14, { duration: 0.8 })
    } catch (e) {}
    const found = markersRef.current.find((m) => {
      try {
        const p = (m as any).getLatLng()
        return Math.abs(p.lat - s.latitude) < 0.0001 && Math.abs(p.lng - s.longitude) < 0.0001
      } catch (e) {
        return false
      }
    })
    if (found) try { (found as any).openPopup() } catch (e) {}
  }

  // Test location with mock coordinates (for development/testing)
  function testLocationWithMock() {
    const testLat = 8.4850  // Freetown center
    const testLng = -13.2350
    console.log('Testing with mock location:', testLat, testLng)
    setCoords({ lat: testLat, lng: testLng })
    setStatus('ready')
    // show user marker
    if (mapRef.current) {
      const L = leafletRef.current
      if (L) {
        const userMarker = L.circleMarker([testLat, testLng], { radius: 8, color: '#2563EB', fillColor: '#3B82F6', fillOpacity: 0.9 }).addTo(mapRef.current)
        userMarker.bindPopup('Test Location').openPopup()
        markersRef.current.push(userMarker as any)
        mapRef.current.flyTo([testLat, testLng], 12, { duration: 1.2 })
      }
    }
    fetchNearest(testLat, testLng)
  }

  return (

    <>

      {/* NAVBAR */}

      <Navigation />



      {/* HERO SECTION (IMAGE BASED + TALL) */}

      <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">

        {/* Background Image */}

        <img

          src="/images/customer-care-hero.jpg" // replace with your real image

          alt="Customer Care Hero"

          className="absolute inset-0 w-full h-full object-cover"

        />



        {/* Dark overlay */}

        <div className="absolute inset-0 bg-black/60" />



        {/* Content */}

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">

          <motion.h1

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            className="text-4xl md:text-6xl font-bold"

          >

            Customer Care & Support

          </motion.h1>




          <motion.p

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.2 }}

            className="mt-4 max-w-2xl text-white/90 text-lg"

          >

            Visit our customer care centers nationwide or use quick self-service codes to manage your QCell account anytime.

          </motion.p>

        </div>

      </section>



      {/* SHOPS SECTION */}

      <section className="py-16 px-6 md:px-16 bg-white">

        <h2 className="text-2xl font-bold mb-8 text-gray-800">

          Customer Care Shops (Nationwide)

        </h2>



        <div className="grid md:grid-cols-2 gap-6">
          <div id="shops-map" className="w-full h-[60vh] md:h-[72vh] rounded-md shadow-sm" />

          <div className="w-full max-h-[60vh] md:max-h-[72vh] overflow-y-auto p-4 bg-white rounded-md shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={requestLocationFromUser}
                  disabled={status === 'locating'}
                  className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-500 text-sm disabled:cursor-not-allowed disabled:bg-orange-400"
                >
                  {status === 'locating' ? 'Locating…' : 'Use my location'}
                </button>
                <button onClick={testLocationWithMock} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-sm">Test Location</button>
              </div>
              <div className="text-sm text-slate-500">
                Click “Use my location” and allow browser location access when prompted. The nearest shops will show at the top of the list.
              </div>
              {coords && (
                <div className="text-sm text-slate-600">
                  Your: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                  {coords.accuracy != null && ` • accuracy ${coords.accuracy.toFixed(0)} m`}
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 whitespace-pre-line">
                {error}
              </div>
            )}

            <div className="mb-3 text-sm font-medium text-gray-700">
              {nearest.length ? 'Nearest shop to your location' : 'All customer care shops'}
            </div>
            <ul className="space-y-2">
              {(nearest.length ? nearest : shopsData).map((s: any, i: number) => (
                <li key={i} className="p-3 border rounded hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{s.name}</div>
                      <div className="text-sm text-gray-600">{s.address}</div>
                      {s.distance_km && <div className="text-xs text-gray-500">{s.distance_km} km</div>}
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      <button onClick={() => flyToShop(s)} className="text-sm px-3 py-1 bg-slate-100 rounded hover:bg-slate-200">Show on map</button>
                      <button onClick={() => { navigator.clipboard?.writeText(s.address || s.name) }} className="text-sm px-3 py-1 bg-slate-50 rounded hover:bg-slate-100">Copy</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>



      {/* HOW TO SECTION */}

      <section className="py-16 px-6 md:px-16 bg-gray-50">

        <h2 className="text-2xl font-bold mb-8 text-gray-800">

          How To Use QCell Short Codes

        </h2>



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {howToCodes.map((item, i) => (

            <motion.div

              key={i}

              whileHover={{ scale: 1.03 }}

              className="p-5 bg-white border rounded-lg shadow-sm"

            >

              <p className="font-semibold text-gray-800">{item.label}</p>

              <p className="text-orange-600 font-mono mt-2 text-lg">

                {item.code}

              </p>

            </motion.div>

          ))}

        </div>

      </section>



      {/* FOOTER */}

      <Footer />

    </>

    )
  }