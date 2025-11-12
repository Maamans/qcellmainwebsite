
"use client";
import Navigation from '@/components/nav';
import BackgroundVideo from '@/components/background-video';
import SliderContent from '@/components/promotions/slider-content';


import Footer from '@/components/footer'
import OfferingsSlider from '@/components/offering-slider'
import { motion, AnimatePresence } from 'framer-motion';
import { promotionsOfferings } from '@/types/promotions-offerings'
import Image from 'next/image'
import { FaGooglePlay, FaAppStoreIos } from 'react-icons/fa'
import { useState, useEffect } from 'react';


export default function Promotions () {
    // Map slider index to image and video
    const sliderMedia = [
      { poster: "/images/tokenbrowse.jpg", video: "/videos/promotion1.mp4" },
      { poster: "/images/device1.png", video: "/videos/promotion1.mp4" },
      { poster: "/images/qcellbonaza.jpg", video: "/videos/promotion1.mp4" },
      { poster: "/images/freenight.jpg", video: "/videos/promotion1.mp4" },
      { poster: "/images/qnite.jpg", video: "/videos/promotion1.mp4" },
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderMedia.length);
      }, 10000);
      return () => clearInterval(interval);
    }, [sliderMedia.length]);

    return (
        <>
        <motion.header className='w-full relative'>
            <Navigation page='promotions' />
            {/* hero */}
            <AnimatePresence>
                <motion.div className="relative min-h-screen w-full">
                    {/* Background video/image changes with slider */}
                    <BackgroundVideo
                        poster={sliderMedia[currentSlide].poster}
                        videoSource={sliderMedia[currentSlide].video}
                    />
                    {/* Content overlayed */}
                    <SliderContent />
                </motion.div>
            </AnimatePresence>
        </motion.header>
        {/* Promotions Slider Section */}
        <section className="pt-20 md:pt-24 pb-16 md:pb-20 bg-white">
          <div className="mb-12 px-4 md:px-8">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-left mb-6">
              Explore Our Latest Promotions
            </h2>
            <p className="text-gray-700 text-lg md:text-xl text-left max-w-3xl">
              Check out the newest offers and special deals just for you!
            </p>
          </div>
          <OfferingsSlider offerings={promotionsOfferings} />
        </section>

        {/* Additional Info Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="w-[90vw] max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4">
            <div className="flex-1 flex flex-col justify-center items-start pl-2 md:pl-8">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
                <span className="text-[#F98F1F]">Enjoy Qcell Promotions </span>
                <span className="text-gray-900">Seamlessly</span>
              </h3>
              <p className="text-gray-700 text-lg md:text-xl mb-8 leading-relaxed max-w-xl">
                <span className="font-semibold text-[#F98F1F]">Experience</span> all our promotions and manage your account easily with the <span className="font-semibold text-[#F98F1F]">QCell Mobile App</span>.<br className="hidden md:block" />
                <span className="text-[#222] font-semibold">Download now</span> and enjoy <span className="text-[#F98F1F] font-semibold">exclusive features</span> at your fingertips! <br />
                <span className="inline-block mt-2 font-extrabold text-white bg-[#F98F1F] px-4 py-2 rounded shadow-lg text-xl md:text-2xl animate-pulse">1GB FREE</span>
              </p>
              <div className="flex gap-4 mt-2">
                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-[#F98F1F]/90 transition bg-[#222] text-white">
                  <FaGooglePlay size={24} />
                  <span className="font-semibold text-base">Google Play</span>
                </a>
                <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg shadow hover:bg-[#F98F1F]/90 transition bg-[#222] text-white">
                  <FaAppStoreIos size={24} />
                  <span className="font-semibold text-base">App Store</span>
                </a>
              </div>
            </div>
            <div className="flex-1 flex justify-end items-center mt-8 md:mt-0 relative">
              <div className="relative p-3">
                <Image src="/qcell-mobile-app.png" alt="QCell App" width={260} height={400} className="rounded-2xl shadow-2xl border-2 border-[#F98F1F]/30 transform rotate-[12deg] hover:rotate-[8deg] transition-transform duration-300 bg-white" unoptimized />
                {/* Redesigned floating labels for a cleaner look */}
                {/* Top-left */}
                <div className="absolute -top-4 -left-8 z-10 bg-[#F98F1F] text-white px-4 py-1.5 rounded-xl shadow font-semibold text-xs md:text-sm border border-white rotate-[-10deg] opacity-90">Seamless Experience</div>
                {/* Top-right */}
                <div className="absolute top-2 right-0 z-10 bg-[#F98F1F] text-white px-4 py-1.5 rounded-xl shadow font-semibold text-xs md:text-sm border border-white rotate-[8deg] opacity-90">All-in-One App</div>
                {/* Bottom-left */}
                <div className="absolute bottom-4 -left-6 z-10 bg-[#F98F1F] text-white px-4 py-1.5 rounded-xl shadow font-semibold text-xs md:text-sm border border-white rotate-[-8deg] opacity-80">Stay Connected</div>
                {/* Bottom-right */}
                <div className="absolute bottom-2 right-2 z-10 bg-[#F98F1F] text-white px-4 py-1.5 rounded-xl shadow font-semibold text-xs md:text-sm border border-white rotate-[12deg] opacity-80">Download Now</div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        </>
    )
}