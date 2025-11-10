"use client"

import { motion } from "framer-motion"

export default function ComboBundles() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-orange-500 mb-6"
      >
        YA MIX PLUS!
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="overflow-x-auto"
      >
        <table className="w-full min-w-[600px] border-collapse">
          <thead>
            <tr>
              <th className="bg-gray-600 text-white p-3 text-left">Data</th>
              <th className="bg-gray-600 text-white p-3 text-left">Mins</th>
              <th className="bg-gray-600 text-white p-3 text-left">SMS</th>
              <th className="bg-gray-600 text-white p-3 text-left">Tariff</th>
              <th className="bg-gray-600 text-white p-3 text-left">Validity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="bg-purple-700 text-white p-3 font-medium">35 MB</td>
              <td className="border p-3 text-center">1</td>
              <td className="border p-3 text-center">50</td>
              <td className="border p-3 text-center text-blue-600 font-medium">Le 2.5</td>
              <td className="border p-3 text-center">Daily</td>
            </tr>
            <tr>
              <td className="bg-purple-700 text-white p-3 font-medium">100 MB</td>
              <td className="border p-3 text-center">3</td>
              <td className="border p-3 text-center">150</td>
              <td className="border p-3 text-center text-blue-600 font-medium">Le 7</td>
              <td className="border p-3 text-center">Weekly</td>
            </tr>
            <tr>
              <td className="bg-purple-700 text-white p-3 font-medium">650 MB</td>
              <td className="border p-3 text-center">10</td>
              <td className="border p-3 text-center">200</td>
              <td className="border p-3 text-center text-blue-600 font-medium">Le 30</td>
              <td className="border p-3 text-center">Monthly</td>
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  )
}
