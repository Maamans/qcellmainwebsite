"use client"

import { motion } from "framer-motion"

export default function VoiceTariffs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Airtime charges section 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="border-l-4 rounded-lg bg-orange-50/40 p-6 mb-4 shadow-sm" style={{ borderColor: '#FF8400' }}
        >
          <p className="text-gray-700 mb-4 text-base font-medium">Airtime charges, Qcell to Qcell</p>
          <h3 className="text-3xl font-bold mb-2" style={{ color: '#FF8400' }}>NLe 1.86 per minute</h3>
        </motion.div>

        {/* Airtime charges section 2 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border-l-4 rounded-lg bg-orange-50/40 p-6 mb-4 shadow-sm" style={{ borderColor: '#FF8400' }}
        >
          <p className="text-gray-700 mb-4 text-base font-medium">Airtime charges, Qcell to Others – All Day</p>
          <h3 className="text-3xl font-bold mb-2" style={{ color: '#FF8400' }}>NLe 1.86 per minute</h3>
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-2xl font-bold mt-12 mb-8 tracking-wide"
        style={{ color: '#FF8400', letterSpacing: '0.03em' }}
      >
        SMS TARIFFS
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* SMS tariffs section 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="border-l-4 rounded-lg bg-orange-50/40 p-6 mb-4 shadow-sm" style={{ borderColor: '#FF8400' }}
        >
          <p className="text-gray-700 mb-4 text-base font-medium">SMS- Qcell to Qcell:</p>
          <h3 className="text-3xl font-bold mb-2" style={{ color: '#FF8400' }}>NLe 0.09 per SMS</h3>
        </motion.div>

        {/* SMS tariffs section 2 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="border-l-4 rounded-lg bg-orange-50/40 p-6 mb-4 shadow-sm" style={{ borderColor: '#FF8400' }}
        >
          <p className="text-gray-700 mb-4 text-base font-medium">SMS- Qcell to other network</p>
          <h3 className="text-3xl font-bold mb-2" style={{ color: '#FF8400' }}>NLe 0.14 per SMS</h3>
        </motion.div>
      </div>
    </div>
  )
}
