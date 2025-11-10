import type React from "react"
import { Smartphone, Network, CreditCard, MessageCircle, Phone, Mail } from "lucide-react"
import Link from "next/link"

interface SupportCategoryProps {
  icon: React.ReactNode
  title: string
  description: string
  stats: string
  hasLink?: boolean
  index: number
}

function SupportCategory({ icon, title, description, stats, hasLink = false, index }: SupportCategoryProps) {
  return (
    <div className="group relative">
      {/* Connection line between cards */}
      {index < 2 && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-500 z-0" />
      )}
      
      <div className="relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-orange-400 transition-all duration-500 hover:shadow-2xl group-hover:scale-105 z-10">
        {/* Floating icon background */}
        <div className="absolute -top-6 left-8 bg-gradient-to-br from-orange-400 to-orange-500 p-4 rounded-2xl shadow-2xl transform group-hover:rotate-12 transition-transform duration-500">
          <div className="text-white">{icon}</div>
        </div>
        
        {/* Stats badge */}
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          {stats}
        </div>

        <div className="pt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            {description}
          </p>
          
          {hasLink && (
            <div className="flex items-center justify-between">
              <Link 
                href="#" 
                className="inline-flex items-center gap-2 text-orange-500 font-semibold text-lg hover:text-orange-600 transition-colors duration-300 group/link"
              >
                Get Support
                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center group-hover/link:bg-orange-200 transition-colors duration-300">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                </div>
              </Link>
              
              <div className="flex gap-2">
                <button className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center hover:bg-orange-100 text-orange-500 transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center hover:bg-orange-100 text-orange-500 transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  )
}

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
  const categories = [
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Device Support",
      description: "Expert assistance for QSmart devices, MiFi routers, accessories, and technical setup.",
      stats: "24/7",
      hasLink: true,
    },
    {
      icon: <Network className="h-6 w-6" />,
      title: "Services",
      description: "Support for Roaming, QFiber, corporate lines, value-added services, and eSIM activation.",
      stats: "Live help",
      hasLink: true,
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Billing",
      description: "Resolve top-up issues, check balances, manage subscriptions, and billing inquiries.",
      stats: "Instant",
      hasLink: false,
    }
  ]

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
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            24/7 Customer Support
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            We&apos;re Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">Help</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Get fast, reliable support for all your connectivity needs. Our expert team is ready to assist you with any issue.
          </p>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {categories.map((category, index) => (
            <SupportCategory
              key={index}
              icon={category.icon}
              title={category.title}
              description={category.description}
              stats={category.stats}
              hasLink={category.hasLink}
              index={index}
            />
          ))}
        </div>

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