import { useState, useEffect } from "react"
import { motion } from "framer-motion"
//import Image from 'next/image'
//import logo from "@/public/images/logo.jpg"

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <motion.div
      className="fixed hidden overflow-hidden md:block top-0 left-0 w-12 h-12 rounded-full bg-blue-200 pointer-events-none z-50 mix-blend-exclusion"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
        {/*<Image src={logo} className="rounded-full scale-10 w-[130%] h-[145%] object-cover opacity-50 mix-blend-overlay" alt="" />*/}
    </motion.div>
    //transition={{ type: "spring", stiffness: 500, damping: 28 }}
  )
}

export default Cursor