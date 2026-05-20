"use client"



import Navigation from "@/components/navigation-two"

import Footer from "@/components/footer"

import { motion } from "framer-motion"



const customerCareShops = [

  "Deaf School, Wilkinson Road, Freetown",

  "8 Wilberforce Street, Freetown",

  "26A Kingharman Road, Freetown",

  "59 Bai Bureh Road, Kissy Shell, Freetown",

  "109 Lumpa Road, Waterloo",

  "Aberdeen Beach Road (Adjacent to Warehouse)",

  "Brookfields (Bus Halt), Freetown",

  "31A Liverpool Street, Freetown",

  "6 Bojon Street, Bo",

  "29 Mabanta Road, Makeni",

  "20 Blama Road, Jacoba Junction, Kenema",

  "New England Ville (Police Post), Freetown",

  "Mofindor Road, Kailahun",

  "Konomani Road, Koidu",

  "Lungi Airport",

  "Lungi Port Loko Road (Lungi)",

  "10 Bomboli Street, Masiaka",

  "1 Sawaneh Street, Moyamba",

]



const howToCodes = [

  { label: "Check main voice balance", code: "*101#" },

  { label: "Buy Bundle", code: "*303#" },

  { label: "Know your Number", code: "*160#" },

  { label: "Transfer Credit", code: "*141*Number*Amount#" },

  { label: "Loan Credit", code: "*393#" },

  { label: "Send Please Call Me", code: "*444*Number#" },

  { label: "Access QPower", code: "*363#" },

  { label: "Access last call info", code: "*102#" },

  { label: "Self activate 4G LTE", code: "*335#" },

  { label: "Access all short codes", code: "*343#" },

]



export default function CustomerCarePage() {

  return (

    <>

      {/* NAVBAR */}

      <Navigation />



      {/* HERO SECTION (IMAGE BASED + TALL) */}

      <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">

        {/* Background Image */}

        <img

          src="/images/customer-care-hero.jpg" // replace with your real image

          alt="Customer Care Hero"

          className="absolute inset-0 w-full h-full object-cover"

        />



        {/* Dark overlay */}

        <div className="absolute inset-0 bg-black/60" />



        {/* Content */}

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 text-white">

          <motion.h1

            initial={{ opacity: 0, y: -20 }}

            animate={{ opacity: 1, y: 0 }}

            className="text-4xl md:text-6xl font-bold"

          >

            Customer Care & Support

          </motion.h1>



          <motion.p

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.2 }}

            className="mt-4 max-w-2xl text-white/90 text-lg"

          >

            Visit our customer care centers nationwide or use quick self-service codes to manage your QCell account anytime.

          </motion.p>

        </div>

      </section>



      {/* SHOPS SECTION */}

      <section className="py-16 px-6 md:px-16 bg-white">

        <h2 className="text-2xl font-bold mb-8 text-gray-800">

          Customer Care Shops (Nationwide)

        </h2>



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {customerCareShops.map((shop, i) => (

            <motion.div

              key={i}

              whileHover={{ scale: 1.03 }}

              className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-orange-50 transition"

            >

              <p className="text-gray-700 text-sm">{shop}</p>

            </motion.div>

          ))}

        </div>

      </section>



      {/* HOW TO SECTION */}

      <section className="py-16 px-6 md:px-16 bg-gray-50">

        <h2 className="text-2xl font-bold mb-8 text-gray-800">

          How To Use QCell Short Codes

        </h2>



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

          {howToCodes.map((item, i) => (

            <motion.div

              key={i}

              whileHover={{ scale: 1.03 }}

              className="p-5 bg-white border rounded-lg shadow-sm"

            >

              <p className="font-semibold text-gray-800">{item.label}</p>

              <p className="text-orange-600 font-mono mt-2 text-lg">

                {item.code}

              </p>

            </motion.div>

          ))}

        </div>

      </section>



      {/* FOOTER */}

      <Footer />

    </>

  )

}