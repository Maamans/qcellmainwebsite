import type React from "react"
import { MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

function SupportChannel({ icon, title, description, time, action }: { icon: React.ReactNode; title: string; description: string; time: string; action: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-orange-400 transition-all duration-300 hover:shadow-lg group">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-lg mb-1">{title}</h4>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-orange-500 text-sm font-medium">{time}</span>
            <Link href="#" className="text-orange-500 font-semibold text-sm hover:text-orange-600 transition-colors duration-300">
              {action} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SupportCategories() {
  const supportChannels = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      description: "Chat instantly with our support agents",
      time: "Available now",
      action: "Start Chat"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      description: "Call our dedicated support line",
      time: "24/7 Available",
      action: "Call Now"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      description: "Send us a detailed message",
      time: "Reply in 2 hours",
      action: "Send Email"
    }
  ]

  return (
    <div className="w-full py-20 bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4">
        {/* Support Channels & Quick Help */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Support Channels */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Quick Support Channels</h2>
            <div className="space-y-4">
              {supportChannels.map((channel, index) => (
                <SupportChannel
                  key={index}
                  icon={channel.icon}
                  title={channel.title}
                  description={channel.description}
                  time={channel.time}
                  action={channel.action}
                />
              ))}
            </div>
          </div>

          {/* Emergency Support Banner */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                <span className="font-semibold text-orange-100">Emergency Support</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Critical Issue?</h3>
              <p className="text-orange-100 text-lg mb-6 leading-relaxed">
                For urgent network outages or critical service disruptions, our priority support team is standing by.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="#" 
                  className="bg-white text-orange-500 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 text-center shadow-2xl hover:shadow-3xl transform hover:scale-105"
                >
                  Emergency Line
                </Link>
                <Link 
                  href="#" 
                  className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 text-center"
                >
                  Report Outage
                </Link>
              </div>
            </div>
            
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-lg border border-orange-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-pulse" />
              <span className="text-gray-700 font-semibold">All Systems Operational</span>
            </div>
            <div className="w-px h-6 bg-orange-300" />
            <span className="text-gray-500 text-sm">Last updated: Just now</span>
          </div>
        </div>
      </div>
    </div>
  )
}