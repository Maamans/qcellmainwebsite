"use client"
import {motion, AnimatePresence} from 'framer-motion'
import { useRef } from 'react'
import Navigation from "@/components/nav"
import BackgroundVideo from '@/components/background-video'

export default function Promotions () {
    const heroContentRef = useRef<HTMLDivElement>(null)

    const hideHeroContent = () => {
        if (heroContentRef.current) {
            heroContentRef.current.animate(
                [{ width: '50%' }, { width: '0' }],
                { duration: 300, fill: 'forwards', easing: 'ease' }
            );
        }
    }

    return (
        <>
        <motion.header className='w-full relative'>
            <Navigation page='promotions' />
            {/** hero */}
            <AnimatePresence>
                <motion.div className="min-h-screen w-full">
                    {/** Background video */}
                    <BackgroundVideo
                        poster="/images/promotion1.png"
                        videoSource="/videos/promotion1.mp4"
                    />
                    {/** Content overlayed */}
                    <motion.div
                        ref={heroContentRef}
                        className='w-[80%] sm:w-2/4 px-10 sm:px-20 bg-black/70 absolute left-0 h-full flex flex-col justify-evenly items-center'
                        initial={{ opacity: 0, width: '0%' }}
                        animate={{ opacity: 1, width: ['50%', '80%'] }}
                        exit={{ opacity: 0, width: '0%' }}
                        transition={{ duration: 0.5 }}
                        onScroll={hideHeroContent}
                    >
                        {/*onMouseMove={handleMouseMove}*/}
                        <AnimatePresence>
                            <motion.h1
                                className='text-white font-light font-mono text-5xl leading-snug sm:5xl md:text-7xl mt-24'
                                initial={{ opacity: 0, y: -40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 40, scale: 0.95 }}
                                transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 60 }}
                            >
                                {/* Discover Our Latest Promotions */}
                                Unbeatable Offers Just for You!
                            </motion.h1>
                        </AnimatePresence>
                        <motion.p
                            className='text-white self-start flex gap-1 flex-shrink-0'
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 60 }}
                        >
                            <motion.p
                                className='block transition-all duration-75 flex-shrink-0 hover:text-[#f98f1f]'
                                initial={{ scale: 1, x: 0 }}
                                animate={{ scale: [1, 1.9, 1], x: [0, 40, 0] }}
                                transition={{ delay: 2, duration: 0.6, times: [0, 0.5, 1], type: "spring", stiffness: 60 }}
                            >
                                Big offers.
                            </motion.p>
                            <motion.p className='block transition-all duration-75 flex-shrink-0 z-10 hover:scale-150 hover:-translate-y-5 hover:text-[#f98f1f]'>Bigger wins. </motion.p> 
                            <motion.p className='block transition-all duration-75 flex-shrink-0 hover:text-[#f98f1f]'>Only from <motion.p className='inline-block text-[#F98F1F]'>Qcell.</motion.p></motion.p>
                        </motion.p>
                        <motion.div className="absolute right-0 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-1 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.2, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-2 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.4, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-3 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.6, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-4 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 1.8, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-5 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 2, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-6 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 2.2, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-7 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 2.4, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-8 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 2.6, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-9 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 2.8, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-10 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 3, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-11 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 3.2, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        <motion.div className="absolute right-12 bg-white w-[2px] h-full mix-blend-overlay"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 3.4, duration: 0.8, type: "spring", stiffness: 60 }}></motion.div>
                        
                    </motion.div>
                    
                </motion.div>
            </AnimatePresence>
        </motion.header>
        {typeof window !== "undefined" && (
            <div
                className="hidden backdrop-filter z-40 bg-black/40 absolute inset-0 transition-all"
                style={{ height: `${document.body.scrollHeight}px` }}
            ></div>
        )}
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        </>
    )
}