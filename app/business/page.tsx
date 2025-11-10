"use client"

import Footer from "@/components/footer"
import Navigation from "@/components/nav"

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation page="business" />
      {/* Hero Section */}
  <section className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center bg-gradient-to-r from-[#f9f6f2] to-[#fff7e6] mb-8">
        <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1200&q=80" alt="Corporate People" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl">Corporate Solutions for Your Business</h1>
          <p className="text-lg md:text-xl text-white font-medium mb-2 drop-shadow-2xl">Empowering organizations with innovative telecom services</p>
        </div>
      </section>

      {/* Corporate Information Section */}
      <main className="flex-1 flex flex-col items-center px-4 pb-12">
        <section className="max-w-5xl w-full py-16 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F98F1F] mb-4">
              Discover Our Corporate Perks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Perk Items - Decorative Cut Rectangle Top Right, Card on Hover */}
            <div className="flex flex-col items-center relative group cursor-pointer">
              <div className="w-10 h-10 bg-[#F98F1F] rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">1</div>
              {/* Decorative cut rectangle */}
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#F98F1F] rounded-tr-lg"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">VPNs &amp; P2P Links</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">Secure, reliable connectivity for your business needs.</p>
              {/* Card overlay on hover */}
              <div className="absolute left-1/2 top-0 z-20 w-64 bg-white rounded-xl shadow-lg p-6 border border-[#F98F1F] opacity-0 group-hover:opacity-100 group-hover:translate-y-2 -translate-x-1/2 transition-all duration-300 pointer-events-none">
                <h4 className="text-lg font-bold text-[#F98F1F] mb-2">VPNs &amp; P2P Links</h4>
                <p className="text-gray-700 text-sm">Our secure VPNs and P2P links ensure your business stays connected with maximum reliability and privacy.</p>
              </div>
            </div>
            <div className="flex flex-col items-center relative group cursor-pointer">
              <div className="w-10 h-10 bg-[#F98F1F] rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">2</div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#F98F1F] rounded-tr-lg"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">State-of-the-art VPN Services</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">For Government, NGOs, Corporates, Diplomatic Missions.</p>
              <div className="absolute left-1/2 top-0 z-20 w-64 bg-white rounded-xl shadow-lg p-6 border border-[#F98F1F] opacity-0 group-hover:opacity-100 group-hover:translate-y-2 -translate-x-1/2 transition-all duration-300 pointer-events-none">
                <h4 className="text-lg font-bold text-[#F98F1F] mb-2">State-of-the-art VPN Services</h4>
                <p className="text-gray-700 text-sm">We provide advanced VPN solutions for government, NGOs, corporates, and diplomatic missions, tailored for security and performance.</p>
              </div>
            </div>
            <div className="flex flex-col items-center relative group cursor-pointer">
              <div className="w-10 h-10 bg-[#F98F1F] rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">3</div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#F98F1F] rounded-tr-lg"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mobile Solutions</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">Closed User Groups, Mobile Internet Bundles, Pre-paid Roaming.</p>
              <div className="absolute left-1/2 top-0 z-20 w-64 bg-white rounded-xl shadow-lg p-6 border border-[#F98F1F] opacity-0 group-hover:opacity-100 group-hover:translate-y-2 -translate-x-1/2 transition-all duration-300 pointer-events-none">
                <h4 className="text-lg font-bold text-[#F98F1F] mb-2">Mobile Solutions</h4>
                <p className="text-gray-700 text-sm">Innovative mobile solutions including closed user groups, internet bundles, and pre-paid roaming for flexible business needs.</p>
              </div>
            </div>
            <div className="flex flex-col items-center relative group cursor-pointer">
              <div className="w-10 h-10 bg-[#F98F1F] rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">4</div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#F98F1F] rounded-tr-lg"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Care Centers</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">15 centers nationwide for support and service.</p>
              <div className="absolute left-1/2 top-0 z-20 w-64 bg-white rounded-xl shadow-lg p-6 border border-[#F98F1F] opacity-0 group-hover:opacity-100 group-hover:translate-y-2 -translate-x-1/2 transition-all duration-300 pointer-events-none">
                <h4 className="text-lg font-bold text-[#F98F1F] mb-2">Customer Care Centers</h4>
                <p className="text-gray-700 text-sm">15 customer care centers nationwide, providing expert support and service for all your telecom needs.</p>
              </div>
            </div>
            <div className="flex flex-col items-center relative group cursor-pointer">
              <div className="w-10 h-10 bg-[#F98F1F] rounded-lg flex items-center justify-center text-white font-bold text-lg mb-4">5</div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#F98F1F] rounded-tr-lg"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Network Expansion</h3>
              <p className="text-gray-600 text-sm leading-relaxed text-center">Constantly upgrading for efficient telecom solutions.</p>
              <div className="absolute left-1/2 top-0 z-20 w-64 bg-white rounded-xl shadow-lg p-6 border border-[#F98F1F] opacity-0 group-hover:opacity-100 group-hover:translate-y-2 -translate-x-1/2 transition-all duration-300 pointer-events-none">
                <h4 className="text-lg font-bold text-[#F98F1F] mb-2">Network Expansion</h4>
                <p className="text-gray-700 text-sm">We are constantly expanding and upgrading our network to deliver the most efficient telecom solutions nationwide.</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
