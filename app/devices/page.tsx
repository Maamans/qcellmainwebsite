"use client"

import Link from "next/link"
import Navigation from "@/components/nav"
import { motion } from "framer-motion"
//import DevicesSlider from "@/components/devices-slider"
import DevicesSlider from "@/components/devices/device-slider"
import DevicesSliderSmall from "@/components/devices/devices-slider-small"
import SliderImages from "@/components/devices/slider-images"
import Footer from "@/components/footer"
import BenefitsSlider from "@/components/benefits-slider"

export default function DevicesPage () {
    return (
        <>
            <Navigation page="devices" />
            <motion.header className="relative h-auto min-h-[60vh] md:h-screen md:flex md:flex-row-reverse md:justify-center md:items-center">
                <motion.div className="relative w-full">
                    {/** images slider / static image i will show here */}
                    {/** for now static image */}
                    {/*<Image src="/images/network-operator.jpg" alt="devices" width={1000} height={1000} className="w-full h-[45vh] object-cover object-right md:h-screen" />*/}
                    <div className="relative w-full h-[45vh] md:h-screen ">
                        <SliderImages />

                    </div>
                    {/*<div className="absolute inset-0 bg-[#F98F1F] opacity-25"></div>*/}
                    <motion.div className="absolute -bottom-20 left-0 right-0 z-20 mx-auto md:hidden">
                        <DevicesSliderSmall />
                    </motion.div>
                </motion.div>
                <motion.div className="relative px-[45px] mx-auto md:pl-[80px] lg:pl-[100px] md:flex md:flex-col md:justify-center">
                    <motion.h1 className="mt-[70px] text-5xl font-bold md:text-6xl md:mt-0"> Devices that keep you connected. </motion.h1>
                    <motion.p className="my-[30px] text-base sm:text-[20px]"> Explore smartphones, routers, and gadgets — all powered by QCell. </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        whileHover={{
                        scale: 1.03,
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="w-[150px] z-30"
                    >
                        <Link
                        href="#devices"
                        className="flex items-center justify-center rounded-sm bg-[#F98F1F] px-5 py-3 text-base font-medium text-white hover:bg-[#ff9c33] hover:text-white z-20 "
                        
                        >
                        See all devices
                        </Link>
                    </motion.div>
                    {/*<motion.div className="block sm:hidden absolute bg-gradient-to-r from-[#ff8400]/80 to-[#ff8400]/80 inset-0 -z-10 h-[110vh] opacity-25 -mt-[70px]"></motion.div>*/}

                </motion.div>
                {/*<motion.div className="hidden sm:block absolute bg-gradient-to-r from-[#ff8400]/80 to-[#ff8400]/80 inset-0 opacity-25 z-10 "></motion.div>*/}

                <motion.div id="devices" className="absolute -bottom-5 left-0 right-0 z-20 hidden md:block">
                    <DevicesSliderSmall />

                </motion.div>

            </motion.header>

            <motion.div className="-mt-8 md:mt-0">
                <DevicesSlider />
            </motion.div>

            <BenefitsSlider />
            <Footer />

        </>
        
    )
}