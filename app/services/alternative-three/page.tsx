"use client";

//import { MotionConfig } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/nav";
import Image from "next/image";

export default function Services () {
    return (
        <>
        <Navigation page='services' />
        <motion.header
            className="relative min-h-screen w-full"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            style={{
                transition: "all 2s"
            }}
        >
            {/** Hero */}
            <AnimatePresence>
                <motion.div className="z-10 container mx-auto relative flex flex-col min-h-screen w-full">
                    {/* 
                        <motion.h1 className="text-6xl text-[#ffffff] absolute top-40 left-28 w-10 z-40 lg:text-7xl lg:w-auto lg:top-52">
                        <TypingEffect />
                        </motion.h1>

                        <motion.h1 className="text-6xl text-[#ffffff] absolute bottom-20 right-40 w-10 z-40 lg:text-7xl lg:w-auto lg:bottom-24">
                            <TypingEffect />
                        </motion.h1>
                    */}
                    <motion.h1 className="text-6xl text-[#ffffff] absolute top-40 left-28 w-10 z-40 lg:text-7xl lg:w-auto lg:top-52"
                    initial={{ opacity: 0, scale: 0.8, x: -40 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 60 }}>Your World, <br /> <span className="text-white hidden md:hidden">Our Services!</span></motion.h1>
                    <motion.h1 className="text-6xl text-[#ffffff] absolute bottom-20 right-60 md:right-40 w-10 z-40 lg:text-7xl lg:w-auto lg:bottom-24"
                    initial={{ opacity: 0, scale: 0.8, y: -40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 10, duration: 0.8, type: "spring", stiffness: 60 }}><span className="hidden md:hidden">Your World,</span> <br /> <span className="text-white">Our Services!</span></motion.h1>

                    <motion.div className="absolute right-20 top-40 z-20">
                        <motion.div
                        className="w-80 h-64 lg:w-96 lg:h-60 bg-gradient-to-r from-red-500/80 to-[#ff8400]/80 rounded-lg shadow-lg mt-10 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 1, scale: 1, y: 0 }}
                                animate={{ opacity: 0, scale: 0.8, y: -40 }}
                                exit={{ opacity: 1 }}
                                transition={{ delay: 10, duration: 0.8, type: "spring", stiffness: 60, loop: Infinity }}
                                className="absolute inset-0 mt-10 flex items-center justify-center z-10">
                                <Image
                                    src="/images/team.jpg"
                                    alt="Services"
                                    width={320}
                                    height={280}
                                    className="object-cover object-center rounded-lg"
                                    
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: -40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 1 }}
                                transition={{ delay: 10, duration: 0.8, type: "spring", stiffness: 60, loop: Infinity }}
                                className="absolute inset-0 mt-10 flex items-center justify-center">
                                <Image
                                    src="/images/freenight.jpg"
                                    alt="Services"
                                    width={320}
                                    height={280}
                                    className="object-cover object-center rounded-lg"
                                    
                                />
                            </motion.div>

                        </motion.div>
                        {/*<motion.div className="absolute top-28 right-20 w-80 h-64 bg-gradient-to-r from-red-500/80 to-[#ff8400]/80 rounded-lg shadow-lg mt-10 flex items-center justify-center">
                            <Image
                                src="/images/labour-day.jpg"
                                alt="Services"
                                width={320}
                                height={240}
                                className="object-cover object-center rounded-lg"
                            />

                        </motion.div>*/}
                    </motion.div>
                    <motion.div className="absolute left-40 md:left-80 bottom-40 z-20"
                        initial={{ opacity: 1, scale: 1, y: 0 }}
                        animate={{ opacity: 0, scale: 0.8, y: -40 }}
                        exit={{ opacity: 1 }}
                        transition={{ delay: 10, duration: 0.8, type: "spring", stiffness: 60, loop: Infinity }}>
                        <motion.div className="w-60 h-40 lg:h-80 lg:w-96 bg-gradient-to-r from-red-500/80 to-[#ff8400]/80 rounded-lg shadow-lg mt-10 flex items-center justify-center">
                            <motion.div initial={{ opacity: 0, scale: 0.8, y: -40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 1 }}
                                transition={{ delay: 0, duration: 0.8, type: "spring", stiffness: 60, loop: Infinity }}
                                className="absolute inset-0 mt-10 flex items-center justify-center">
                                <Image
                                    src="https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Services"
                                    width={320}
                                    height={240}
                                    className="object-cover object-center rounded-lg"
                                />
                            </motion.div> 

                        </motion.div>
                        
                    </motion.div>
                    <motion.div className="absolute left-40 md:left-80 bottom-48 z-20"
                        initial={{ opacity: 0, scale: 0.8, y: -40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 10, duration: 0.8, type: "spring", stiffness: 60, loop: Infinity }}>
                        <motion.div className="w-60 h-40 bg-gradient-to-r from-red-500/80 to-[#ff8400]/80 rounded-lg shadow-lg mt-10 flex items-center justify-center">
                            <Image
                                src="/images/freenight.jpg"
                                alt="Services"
                                width={320}
                                height={240}
                                className="object-cover object-center rounded-lg"
                            />

                        </motion.div>
                        <motion.div className="absolute top-28 right-20 w-60 h-40 bg-gradient-to-r from-red-500/80 to-[#ff8400]/80 rounded-lg shadow-lg mt-10 flex items-center justify-center">
                            <Image
                                src="/images/labour-day.jpg"
                                alt="Services"
                                width={320}
                                height={240}
                                className="object-cover object-center rounded-lg"
                            />

                        </motion.div>
                    </motion.div>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/80 to-[#ff8400]/80 z-0 opacity-80" />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </AnimatePresence>
        </motion.header>

        {typeof window !== "undefined" && (
            <div
                className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all"
                style={{ height: `${document.body.scrollHeight}px` }}
            ></div>
        )}
        </>
    )
}