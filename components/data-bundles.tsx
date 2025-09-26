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
          <h3 className="text-xl font-bold text-orange-500 mb-4">DATA BUNDLES</h3>
          <table className="w-full min-w-[300px] border-collapse">
            <thead>
              <tr>
                <th className="bg-orange-700 text-white p-2 text-left">Bundle</th>
                <th className="bg-orange-700 text-white p-2 text-left">MBs</th>
                <th className="bg-orange-700 text-white p-2 text-left">Tariff</th>
                <th className="bg-orange-700 text-white p-2 text-left">Validity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-purple-100">
                <td colSpan={4} className="p-2 text-center font-medium text-orange-700">
                  Daily
                </td>
              </tr>
              <tr>
                <td className="border p-2">15MB</td>
                <td className="border p-2">15</td>
                <td className="border p-2">NLe 0.40</td>
                <td className="border p-2">1 Day</td>
              </tr>
              <tr>
                <td className="border p-2">30MB</td>
                <td className="border p-2">30</td>
                <td className="border p-2">NLe 0.60</td>
                <td className="border p-2">1 Day</td>
              </tr>
              <tr>
                <td className="border p-2">75MB</td>
                <td className="border p-2">75</td>
                <td className="border p-2">NLe 1.50</td>
                <td className="border p-2">1 Day</td>
              </tr>
              <tr>
                <td className="border p-2">260MB</td>
                <td className="border p-2">260</td>
                <td className="border p-2">NLe 5.20</td>
                <td className="border p-2">1 Day</td>
              </tr>
              <tr className="bg-purple-100">
                <td colSpan={4} className="p-2 text-center font-medium text-orange-700">
                  Weekly
                </td>
              </tr>
              <tr>
                <td className="border p-2">100MB</td>
                <td className="border p-2">100</td>
                <td className="border p-2">NLe 2</td>
                <td className="border p-2">7 Days</td>
              </tr>
              <tr>
                <td className="border p-2">500MB</td>
                <td className="border p-2">500</td>
                <td className="border p-2">NLe 10</td>
                <td className="border p-2">7 Days</td>
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
          <h3 className="text-xl font-bold text-orange-500 mb-4">POST-PAID BUNDLES</h3>
          <table className="w-full min-w-[300px] border-collapse">
            <thead>
              <tr>
                <th className="bg-orange-700 text-white p-2 text-left">Bundle</th>
                <th className="bg-orange-700 text-white p-2 text-left">MBs</th>
                <th className="bg-orange-700 text-white p-2 text-left">Tariff</th>
                <th className="bg-orange-700 text-white p-2 text-left">Validity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">100MB</td>
                <td className="border p-2">100</td>
                <td className="border p-2">NLe 2</td>
                <td className="border p-2">7 Days</td>
              </tr>
              <tr>
                <td className="border p-2">500MB</td>
                <td className="border p-2">500</td>
                <td className="border p-2">NLe 10</td>
                <td className="border p-2">7 Days</td>
              </tr>
              <tr>
                <td className="border p-2">1GB</td>
                <td className="border p-2">1,000</td>
                <td className="border p-2">NLe 20</td>
                <td className="border p-2">30 Days</td>
              </tr>
              <tr>
                <td className="border p-2">2.5GB</td>
                <td className="border p-2">2,500</td>
                <td className="border p-2">NLe 50</td>
                <td className="border p-2">30 Days</td>
              </tr>
              <tr>
                <td className="border p-2">6GB</td>
                <td className="border p-2">6,000</td>
                <td className="border p-2">NLe 120</td>
                <td className="border p-2">30 Days</td>
              </tr>
              <tr>
                <td className="border p-2">15GB</td>
                <td className="border p-2">15,000</td>
                <td className="border p-2">NLe 300</td>
                <td className="border p-2">30 Days</td>
              </tr>
              <tr>
                <td className="border p-2">30GB</td>
                <td className="border p-2">30,000</td>
                <td className="border p-2">NLe 600</td>
                <td className="border p-2">30 Days</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* TIKTOK BUNDLES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="overflow-x-auto"
        >
          <h3 className="text-xl font-bold text-orange-500 mb-4">TIKTOK BUNDLES</h3>
          <table className="w-full min-w-[300px] border-collapse">
            <thead>
              <tr>
                <th className="bg-orange-700 text-white p-2 text-left">Bundle</th>
                <th className="bg-orange-700 text-white p-2 text-left">MBs</th>
                <th className="bg-orange-700 text-white p-2 text-left">Tariff</th>
                <th className="bg-orange-700 text-white p-2 text-left">Validity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">50MB</td>
                <td className="border p-2">50</td>
                <td className="border p-2">NLe 1</td>
                <td className="border p-2">24 Hours</td>
              </tr>
              <tr>
                <td className="border p-2">300MB</td>
                <td className="border p-2">300</td>
                <td className="border p-2">NLe 6</td>
                <td className="border p-2">7 Days</td>
              </tr>
              <tr>
                <td className="border p-2">1GB</td>
                <td className="border p-2">1,024</td>
                <td className="border p-2">NLe 20</td>
                <td className="border p-2">30 Days</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 bg-orange-500 text-white text-center py-3 rounded-md font-bold">*454#</div>
        </motion.div>
      </div>
    </div>
  )
}
