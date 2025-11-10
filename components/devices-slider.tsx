'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const devices = [
    { id: 1, image: '/images/balloon.png' },
    { id: 2, image: '/images/clouds-bg.png' },
    { id: 3, image: '/images/inclusion-1.jpg' },
    { id: 4, image: '/images/inclusion-2.jpg' },
    { id: 5, image: '/images/inclusion-3.jpg' },
];

export default function DeviceSlider() {
    const [start, setStart] = useState(0);
    const visibleCount = 3;

    const paginate = (direction: number) => {
        setStart((prev) => (prev + direction + devices.length) % devices.length);
    };

    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            items.push(devices[(start + i) % devices.length]);
        }
        return items;
    };

    return (
        <div className="w-full flex flex-col items-center py-10 bg-gray-50 gap-4 overflow-hidden">
            <div className="flex justify-between items-center w-full px-4 md:px-10">
                <button
                    onClick={() => paginate(-1)}
                    className="p-2 rounded-full bg-orange-400 text-white hover:bg-orange-500 transition-transform transform hover:scale-110"
                >
                    <ChevronLeft />
                </button>

                <div className="flex gap-4 w-full max-w-4xl overflow-hidden">
                    <AnimatePresence initial={false}>
                        {getVisibleItems().map((device, idx) => (
                            <motion.div
                                key={device.id}
                                className="flex-shrink-0 w-full sm:w-1/3 px-2"
                                initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: idx === 0 ? 50 : -50 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
                                <img
                                    src={device.image}
                                    alt={`device-${device.id}`}
                                    className="rounded-xl object-cover w-full h-48 sm:h-64 mx-auto shadow-lg"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => paginate(1)}
                    className="p-2 rounded-full bg-orange-400 text-white hover:bg-orange-500 transition-transform transform hover:scale-110"
                >
                    <ChevronRight />
                </button>
            </div>

            <div className="flex gap-2 mt-4">
                {devices.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                            idx === start ? 'bg-orange-400' : 'bg-gray-300'
                        } transition-all duration-300`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
