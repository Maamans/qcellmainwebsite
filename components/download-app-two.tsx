"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Download, Zap, Wifi, Battery, Signal } from 'lucide-react';

export default function AppDownloadPortal() {
  const [isExploring, setIsExploring] = useState(false);
  const [activeApp, setActiveApp] = useState(0);
  const phoneRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const scale = useTransform(progress, [0, 100], [0.8, 1.2]);

  // App holograms data
  const apps = [
    { name: "Data Wizard", icon: <Wifi className="text-[#F98F1F]" />, color: "bg-[#F98F1F]/10" },
    { name: "Signal Boost", icon: <Signal className="text-[#4A90E2]" />, color: "bg-[#4A90E2]/10" },
    { name: "Power Save", icon: <Battery className="text-[#7ED321]" />, color: "bg-[#7ED321]/10" }
  ];

  // Simulate download progress
  useEffect(() => {
    const animation = animate(progress, 100, {
      duration: 3,
      onComplete: () => {
        setIsExploring(true);
      }
    });

    return () => animation.stop();
  }, []);

  // Interactive hologram rotation
  useEffect(() => {
    if (!isExploring) return;
    const interval = setInterval(() => {
      setActiveApp((prev) => (prev + 1) % apps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isExploring]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Cyber grid background */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[length:40px_40px] opacity-10" />

      {/* Floating phone interface */}
      <motion.div 
        ref={phoneRef}
        className="absolute left-1/2 top-1/2 h-[500px] w-[250px] -translate-x-1/2 -translate-y-1/2"
        style={{ scale }}
        drag
        dragConstraints={{ top: -100, right: 100, bottom: 100, left: -100 }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Holographic phone shell */}
        <div className="absolute inset-0 rounded-[40px] border-[12px] border-gray-800/50 bg-gray-900/80 backdrop-blur-md shadow-[0_0_60px_#F98F1F/30]">
          {/* Interactive screen */}
          <div className="absolute inset-4 rounded-2xl overflow-hidden">
            {isExploring ? (
              <motion.div 
                key={activeApp}
                className={`h-full flex flex-col items-center justify-center ${apps[activeApp].color} p-6`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="mb-6 p-4 rounded-full bg-white/10 backdrop-blur-sm"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  {apps[activeApp].icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{apps[activeApp].name}</h3>
                <div className="h-[2px] w-16 bg-white/30 my-4" />
                <button className="px-6 py-2 rounded-full bg-white text-black text-sm font-medium">
                  ACTIVATE
                </button>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6">
                <motion.div 
                  className="relative mb-8"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="h-12 w-12 text-[#F98F1F]" />
                </motion.div>
                <div className="w-full bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#F98F1F] rounded-full"
                    style={{ width: `${progress.get()}%` }}
                  />
                </div>
                <p className="text-white/80 text-sm">INITIALIZING QCELL OS</p>
              </div>
            )}
          </div>
        </div>

        {/* Holographic glow */}
        <motion.div 
          className="absolute inset-0 rounded-[40px] border-[1px] border-[#F98F1F]/30 pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 20px #F98F1F/10",
              "0 0 40px #F98F1F/20",
              "0 0 20px #F98F1F/10"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>

      {/* Interactive download prompt */}
      <motion.div 
        className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5 }}
      >
        <motion.button
          className="px-8 py-4 rounded-full bg-[#F98F1F] text-black text-lg font-bold flex items-center gap-3 shadow-[0_0_30px_#F98F1F/40]"
          whileHover={{ scale: 1.05, boxShadow: "0 0 40px #F98F1F/60" }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-5 w-5" />
          DOWNLOAD HOLO-APP
        </motion.button>
        <p className="text-white/50 text-sm mt-4">DRAG PHONE TO EXPLORE</p>
      </motion.div>

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#F98F1F]"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}