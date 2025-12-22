'use client'
import React from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';

interface TimelineItemInterface {
    date: string;
    text: string[];
    image: string;
    link: {
        url: string;
        text: string;
        imageUrl?: string;
    };
    detailText?: string[];
    quote?: {
        text: string;
        author: string;
        authorImage: string;
    };
    definition?: {
        term: string;
        pronunciation: string;
        meaning: string;
        partOfSpeech: string;
    };
    milestone?: string;
}

interface TimelineItemsInterface {
    items: TimelineItemInterface[];
}

const timelineItems: TimelineItemsInterface = { items: [
    {
        date: '2019',
        text: [
            "QCell launches operations in Sierra Leone, bringing innovative telecommunications services to connect communities across the nation.",
        ],
        image: '/images/qcell-network.png',
        link: {
            url: "",
            text: "",
        },
        detailText: [
            "Established our first network infrastructure and began serving customers in Freetown and surrounding areas.",
        ],
        quote: {
            text: "We saw an opportunity to transform telecommunications in Sierra Leone and bring world-class connectivity to our people.",
            author: "Jayamani Karthick, CEO",
            authorImage: "/images/team.jpg"
        },
        milestone: "🚀 QCELL FOUNDED",
    },
    {
        date: 'Current',
        text: [
            "Continuing to innovate with next-generation services, expanding digital inclusion programs, and preparing for future technological advancements.",
        ],
        image: '/images/qcell-network-two.png',
        link: {
            url: "",
            text: "",
        },
        detailText: [
            "Focusing on digital inclusion, sustainable growth, and preparing Sierra Leone for the digital future with cutting-edge telecommunications solutions.",
        ],
        quote: {
            text: "Our journey continues as we build the digital foundation for Sierra Leone's future, connecting every citizen and empowering every business.",
            author: "Jayamani Karthick, CEO",
            authorImage: "/images/team.jpg"
        },
        milestone: "🚀 FUTURE READY",
    }
]};

const TimelineItem = ({ item, index }: { item: TimelineItemInterface; index: number }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-100px' });

    return (
        <motion.div 
            ref={ref} 
            className="relative mb-24 md:mb-32"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 50 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column - Date */}
                <div className="lg:col-span-3 flex flex-col items-start lg:items-end">
                    <motion.div
                        className="relative"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                    >
                        {/* Date Badge */}
                        <div className="bg-gradient-to-br from-[#FF8C00] to-[#FFA500] text-white px-6 py-3 rounded-full shadow-lg font-bold text-xl md:text-2xl">
                            {item.date}
                        </div>
                        {/* Connecting Line */}
                        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[#FF8C00] to-transparent"></div>
                    </motion.div>
                </div>

                {/* Center Column - Timeline Dot */}
                <div className="hidden lg:flex lg:col-span-1 justify-center relative">
                    {/* Vertical Line */}
                    <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF8C00] via-[#FFA500] to-[#FF8C00] opacity-30"></div>
                    {/* Animated Dot */}
                    <motion.div
                        className="relative z-10 mt-6"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.2 + 0.4, type: "spring", stiffness: 200 }}
                    >
                        <div className="w-6 h-6 bg-gradient-to-br from-[#FF8C00] to-[#FFA500] rounded-full shadow-lg border-4 border-white"></div>
                        {/* Pulse Effect */}
                        {inView && (
                            <motion.div
                                className="absolute inset-0 bg-[#FF8C00] rounded-full"
                                animate={{ scale: [1, 2, 2], opacity: [0.6, 0, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                    </motion.div>
                </div>

                {/* Right Column - Content */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Milestone Badge */}
                    {item.milestone && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.2 + 0.2 }}
                        >
                            <div className="inline-block bg-gradient-to-r from-[#FFF7ED] to-[#FFE8D1] border-2 border-[#FF8C00] px-4 py-2 rounded-full">
                                <span className="text-[#FF8C00] font-bold text-sm">{item.milestone}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Main Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                    >
                        {item.text.map((text: string, textIndex: number) => (
                            <p key={textIndex} className="text-lg md:text-xl text-gray-800 leading-relaxed mb-4">
                                {text}
                            </p>
                        ))}
                    </motion.div>

                    {/* Detail Text */}
                    {item.detailText && item.detailText.length > 0 && (
                        <motion.div
                            className="bg-gray-50 rounded-xl p-6 border-l-4 border-[#FF8C00]"
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.2 + 0.4 }}
                        >
                            {item.detailText.map((text: string, textIndex: number) => (
                                <p key={textIndex} className="text-gray-600 leading-relaxed mb-2">
                                    {text}
                                </p>
                            ))}
                        </motion.div>
                    )}

                    {/* Image */}
                    <motion.div
                        className="relative rounded-2xl overflow-hidden shadow-2xl group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="aspect-video relative overflow-hidden">
                            <Image 
                                src={item.image} 
                                alt="" 
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                        </div>
                    </motion.div>

                    {/* Quote */}
                    {item.quote && (
                        <motion.div
                            className="bg-gradient-to-br from-[#FFF7ED] to-[#FFE8D1] rounded-2xl p-6 md:p-8 border-2 border-[#FF8C00]/30 shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ delay: index * 0.2 + 0.6 }}
                        >
                            <div className="flex items-start gap-4">
                                {item.quote.authorImage && (
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-[#FF8C00]">
                                        <Image
                                            src={item.quote.authorImage}
                                            alt={item.quote.author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="text-4xl text-[#FF8C00] mb-2">&quot;</div>
                                    <p className="text-lg md:text-xl text-gray-800 italic leading-relaxed mb-4">
                                        {item.quote.text}
                                    </p>
                                    <div className="text-right">
                                        <p className="font-bold text-[#FF8C00]">{item.quote.author}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

const Timeline = () => {
    return (
        <section className="relative py-24 md:py-32 px-4 md:px-8 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#FF8C00]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16 md:mb-24"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-[#FF8C00] font-semibold text-sm uppercase tracking-wider mb-4">Our Journey</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        <span className="text-gray-900">Building</span>{' '}
                        <span className="text-[#FF8C00]">Connections</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        From our founding to today, discover the milestones that shaped QCell into Sierra Leone&apos;s leading telecommunications provider.
                    </p>
                </motion.div>

                {/* Timeline Items */}
                <div className="relative">
                    {timelineItems.items.map((item: TimelineItemInterface, index: number) => (
                        <TimelineItem key={index} item={item} index={index} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16 md:mt-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-block bg-gradient-to-r from-[#FF8C00] to-[#FFA500] text-white px-8 py-4 rounded-full shadow-lg font-semibold text-lg hover:shadow-xl transition-all duration-300">
                        Join Us on This Journey
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Timeline;
