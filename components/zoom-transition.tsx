"use client"

//import { motion } from "framer-motion"
import { useEffect } from "react"

interface ZoomTransitionProps {
  onZoomComplete: () => void
}

export function ZoomTransition({ onZoomComplete }: ZoomTransitionProps) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onZoomComplete()
    }, 2000)

    return () => clearTimeout(timeout)
  }, [onZoomComplete])

  return (
    <>
  <div
    className="relative text-8xl font-bold flex justify-center items-center"
    style={{
      animation: 'zoomToC 2s ease-in-out forwards',
    }}
  >
    <span className="text-gray-800">Q</span>
    <div className="relative inline-block">
      <span className="relative text-[#CD7F32] text-8xl font-bold">
        C
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-[93%] h-[60%] bg-[#CD7F32]/20 rounded-full" />
        </span>
      </span>
    </div>
    <span className="text-gray-800">ELL</span>
  </div>
</>



  )
}