import type React from "react"
import { XIcon as MobileX, Smartphone, Network, CreditCard } from "lucide-react"
import Link from "next/link"

interface SupportCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
  hasLink?: boolean
}

function SupportCategory({ icon, title, description, hasLink = false }: SupportCategoryProps) {
  return (
    <div className="bg-orange-50 rounded-xl p-6 flex flex-col items-center text-center border border-orange-100 transition-all hover:shadow-md">
      <div className="text-orange-400 mb-4">{icon}</div>
      <h3 className="text-orange-500 font-medium text-lg mb-3">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      {hasLink && (
        <Link href="#" className="text-orange-500 font-medium hover:text-orange-600 text-sm mt-auto">
          Get help?
        </Link>
      )}
    </div>
  )
}

export default function SupportCategories() {
  return (
    <div className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Support</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <SupportCategory
            icon={<MobileX className="h-10 w-10" />}
            title="Sim and Network Issues"
            description="Lost SIM, no signal, mobile data problems, SIM registration."
          />

          <SupportCategory
            icon={<Smartphone className="h-10 w-10" />}
            title="Device Support"
            description="Help with QSmart, MiFi, Routers, and accessories."
            hasLink
          />

          <SupportCategory
            icon={<Network className="h-10 w-10" />}
            title="Services"
            description="Assistance with Roaming, QFiber, CUG, VAS, and eSIM."
            hasLink
          />

          <SupportCategory
            icon={<CreditCard className="h-10 w-10" />}
            title="Billing and subscription"
            description="Top-up issues, checking balance, missing credit, or auto-recharge."
          />
        </div>
      </div>
    </div>
  )
}
