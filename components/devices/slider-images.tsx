import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"


const heroImages = [
    "https://images.unsplash.com/photo-1704253807308-ce150821a03d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1625490939776-17cef70ec079?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1723929986133-67c123443af1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1588071403595-0c38ecd98036?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1737178790310-4c3ffd832cac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/flagged/photo-1577192056296-6538f8708bf2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1731213562305-0152c6946bdc?q=80&w=1531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1622556498246-755f44ca76f3?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]


export default function SliderImages () {
    const [currentSlide, setCurrentSlide] = useState(0)
    const heroRef = useRef<HTMLDivElement>(null)
    
    // Auto-advance slider
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
        }, 10000)
    
        return () => clearInterval(interval)
    }, [])

    return (
        <div ref={heroRef} className="relative w-full h-full overflow-hidden">
            {/* Slider Images */}
            <AnimatePresence initial={false}>
                <motion.div
                key={currentSlide}
                className="absolute inset-0 z-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    transition: "all 2s"
                }}
                >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 to-[#ff8400]/80 z-10 mix-blend-overlay" />
                <Image
                    src={heroImages[currentSlide] || "/placeholder.svg"}
                    alt={`Slide ${currentSlide + 1}`}
                    fill
                    className="object-cover object-center"
                    priority
                />
                </motion.div>
            </AnimatePresence>
        </div>

    )
}