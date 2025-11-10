"use client"

import { motion } from "framer-motion"

export default function DataBundles() {
  return (
    <div className="container mx-auto px-4 py-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl font-bold text-purple-700 mb-6"
    >
      Qcell offers you the Fastest High Speed Internet Service to browse the internet, upload and download data
      files.
    </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* DATA BUNDLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: '#FF8400' }}>DATA BUNDLES</h3>
          <table className="w-full min-w-[300px] border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr>
                <th className="bg-[#FF8400] text-white p-3 text-left">Bundle</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">MBs</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">Tariff</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">Validity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-orange-50">
                <td colSpan={4} className="p-3 text-center font-semibold" style={{ color: '#FF8400' }}>
                  Daily
                </td>
              </tr>
              <tr>
                <td className="border p-3">15MB</td>
                <td className="border p-3">15</td>
                <td className="border p-3">NLe 0.40</td>
                <td className="border p-3">1 Day</td>
              </tr>
              <tr>
                <td className="border p-3">30MB</td>
                <td className="border p-3">30</td>
                <td className="border p-3">NLe 0.60</td>
                <td className="border p-3">1 Day</td>
              </tr>
              <tr>
                <td className="border p-3">75MB</td>
                <td className="border p-3">75</td>
                <td className="border p-3">NLe 1.50</td>
                <td className="border p-3">1 Day</td>
              </tr>
              <tr>
                <td className="border p-3">260MB</td>
                <td className="border p-3">260</td>
                <td className="border p-3">NLe 5.20</td>
                <td className="border p-3">1 Day</td>
              </tr>
              <tr className="bg-orange-50">
                <td colSpan={4} className="p-3 text-center font-semibold" style={{ color: '#FF8400' }}>
                  Weekly
                </td>
              </tr>
              <tr>
                <td className="border p-3">100MB</td>
                <td className="border p-3">100</td>
                <td className="border p-3">NLe 2</td>
                <td className="border p-3">7 Days</td>
              </tr>
              <tr>
                <td className="border p-3">500MB</td>
                <td className="border p-3">500</td>
                <td className="border p-3">NLe 10</td>
                <td className="border p-3">7 Days</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* POST-PAID BUNDLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="overflow-x-auto"
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: '#FF8400' }}>POST-PAID BUNDLES</h3>
          <table className="w-full min-w-[300px] border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr>
                <th className="bg-[#FF8400] text-white p-3 text-left">Bundle</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">MBs</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">Tariff</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">Validity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">100MB</td>
                <td className="border p-3">100</td>
                <td className="border p-3">NLe 2</td>
                <td className="border p-3">7 Days</td>
              </tr>
              <tr>
                <td className="border p-3">500MB</td>
                <td className="border p-3">500</td>
                <td className="border p-3">NLe 10</td>
                <td className="border p-3">7 Days</td>
              </tr>
              <tr>
                <td className="border p-3">1GB</td>
                <td className="border p-3">1,000</td>
                <td className="border p-3">NLe 20</td>
                <td className="border p-3">30 Days</td>
              </tr>
              <tr>
                <td className="border p-3">2.5GB</td>
                <td className="border p-3">2,500</td>
                <td className="border p-3">NLe 50</td>
                <td className="border p-3">30 Days</td>
              </tr>
              <tr>
                <td className="border p-3">6GB</td>
                <td className="border p-3">6,000</td>
                <td className="border p-3">NLe 120</td>
                <td className="border p-3">30 Days</td>
              </tr>
              <tr>
                <td className="border p-3">15GB</td>
                <td className="border p-3">15,000</td>
                <td className="border p-3">NLe 300</td>
                <td className="border p-3">30 Days</td>
              </tr>
              <tr>
                <td className="border p-3">30GB</td>
                <td className="border p-3">30,000</td>
                <td className="border p-3">NLe 600</td>
                <td className="border p-3">30 Days</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* SOCIAL MEDIA BUNDLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="overflow-x-auto"
        >
          <h3 className="text-xl font-bold mb-4" style={{ color: '#FF8400' }}>SOCIAL MEDIA BUNDLES</h3>
          <table className="w-full min-w-[300px] border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr>
                <th className="bg-[#FF8400] text-white p-3 text-left">Bundle</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">MBs</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">Tariff</th>
                <th className="bg-[#FF8400] text-white p-3 text-left">Validity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-3">50MB</td>
                <td className="border p-3">50</td>
                <td className="border p-3">NLe 1</td>
                <td className="border p-3">24 Hours</td>
              </tr>
              <tr>
                <td className="border p-3">300MB</td>
                <td className="border p-3">300</td>
                <td className="border p-3">NLe 6</td>
                <td className="border p-3">7 Days</td>
              </tr>
              <tr>
                <td className="border p-3">1GB</td>
                <td className="border p-3">1,024</td>
                <td className="border p-3">NLe 20</td>
                <td className="border p-3">30 Days</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 bg-[#FF8400] text-white text-center py-3 rounded-md font-bold text-lg tracking-wide shadow">*454#</div>
        </motion.div>
      </div>
    </div>
  )
}
