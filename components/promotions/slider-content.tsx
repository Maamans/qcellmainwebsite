import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion';

const heroContent = [
    {
        tag: 'promotions',
        title: "Unbeatable Offers Just for You!",
        description: "Big offers. Bigger wins. Only from Qcell.",
    },
    {
        tag: 'Emergency Sites',
        title: "Always Connected, Wherever You Are!",
        description: "Emergency coverage when you need it most—powered by QCell.",
    },
    {
        tag: 'Recharge Bonanza',
        title: "Recharge and Win Big!",
        description: "Every top-up brings you closer to amazing rewards.",
    },
    {
        tag: 'QCell Bonanza',
        title: "The Ultimate QCell Giveaway!",
        description: "Phones, cash, data and more—just for being with us.",
    },
    {
        tag: 'Tok En Browse',
        title: "Talk More, Browse More!",
        description: "Get minutes and data in one unbeatable bundle.",
    },
    {
        tag: 'Qnite',
        title: "Browse All Night for Less!",
        description: "Nighttime data at unbeatable prices—only on Qnite.",
    },
    {
        tag: 'Promo 1',
        title: "Special Promotion Available Now!",
        description: "Don't miss out on this amazing offer from QCell.",
    },
    {
        tag: 'Promo 2',
        title: "Another Fantastic Deal!",
        description: "Get the best value with our latest promotion.",
    }
]

export default function SliderContent () {
    const heroContentRef = useRef<HTMLDivElement>(null)
    const [targetWidth, setTargetWidth] = useState('80%');
    const [isMounted, setIsMounted] = useState(false);
    const currentSlide = 0; // Always show first content

    useEffect(() => {
        setIsMounted(true);
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // sm and up (Tailwind's sm breakpoint is 640px)
                setTargetWidth('50%');
            } else {
                setTargetWidth('80%');
            }
        };

        handleResize(); // Set initially
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const hideHeroContent = () => {
        if (heroContentRef.current) {
            heroContentRef.current.animate(
                [{ width: '50%' }, { width: '0' }],
                { duration: 300, fill: 'forwards', easing: 'ease' }
            );
        }
    }

    if (!isMounted) {
        return null;
    }

    return (
        <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        >
                <motion.div
                    ref={heroContentRef}
                    className='w-[80%] sm:w-2/4 px-10 sm:px-20 bg-black/70 absolute left-0 h-full flex flex-col justify-evenly items-center'
                    initial={{ opacity: 0, width: '0%' }}
                    animate={{ opacity: 1, width: targetWidth }}
                    transition={{ duration: 0.5 }}
                    onScroll={hideHeroContent}
                >
            
                    <motion.h1
                        className='text-white font-light font-mono text-5xl leading-snug sm:5xl md:text-7xl mt-24'
                        initial={{ opacity: 0, y: -40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 60 }}
                    >
                        {heroContent[currentSlide].title}
                    </motion.h1>
                    {
                        heroContent[currentSlide].tag === "promotions" ? (
                            <motion.p
                                className='text-white self-start flex gap-3 flex-shrink-0'
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 60 }}
                            >
                                <motion.p
                                    className='block transition-all duration-75 hover:text-[#f98f1f] border-b-2 border-[#f98f1f] pb-2'
                                    initial={{ scale: 1, x: 0 }}
                                    animate={{ scale: [1, 1.9, 1], x: [0, 40, 0] }}
                                    transition={{ delay: 2, duration: 0.6, times: [0, 0.5, 1], type: "spring", stiffness: 60 }}
                                >
                                    {heroContent[currentSlide].description.split(".")[0].split(" ")[0]} <br />
                                    {heroContent[currentSlide].description.split(".")[0].split(" ")[1]}.
                                </motion.p>
                                <motion.p className='block transition-all duration-75 z-10 hover:scale-150 hover:-translate-y-5 hover:text-[#f98f1f]'>
                                    {heroContent[currentSlide].description.split(".")[1].split(" ")[1]} <br />
                                    {heroContent[currentSlide].description.split(".")[1].split(" ")[2]}.
                                </motion.p> 
                                <motion.p className='block transition-all duration-75 hover:text-[#f98f1f] border-b-2 border-[#f98f1f] pb-2'>
                                    {heroContent[currentSlide].description.split(".")[2].split(" ")[1] + " " + heroContent[currentSlide].description.split(".")[2].split(" ")[2]} <br /> {/*<motion.p className='inline-block text-[#F98F1F]'>Qcell.</motion.p>*/}
                                    {heroContent[currentSlide].description.split(".")[2].split(" ")[3]} {/*<motion.p className='inline-block text-[#F98F1F]'>Qcell.</motion.p>*/}
                                </motion.p>
                            </motion.p>
                        ) : (

                            <motion.p
                                className='text-white self-start flex gap-1 flex-shrink-0'
                                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.8, type: "spring", stiffness: 60 }}
                            > 
                                <motion.p className='block transition-all duration-75 z-10 hover:scale-105   hover:-translate-y-5 hover:text-[#f98f1f]'>{heroContent[currentSlide].description} </motion.p>
                            </motion.p>
                        )

                    }
                
                    {Array.from({ length: 13 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className={`absolute right-${i} bg-[#f98f1f]/90 w-[2px] h-full mix-blend-overlay`}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                        delay: 1 + i * 0.2,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 60
                        }}
                    />
                    ))}
                </motion.div>
            </motion.div>
    )
}