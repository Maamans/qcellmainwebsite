"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PlanFeature {
  feature: string
  included: boolean
}

interface Plan {
  name: string
  price: string
  description: string
  features: PlanFeature[]
  popular?: boolean
  color: string
}

export default function TariffPlans() {
  const [planDuration, setPlanDuration] = useState("monthly")

  const plans: Plan[] = [
    {
      name: "Basic",
      price: planDuration === "monthly" ? "$9.99" : "$99.99",
      description: "Perfect for light users who need essential connectivity.",
      color: "blue",
      features: [
        { feature: "1GB Data", included: true },
        { feature: "100 Minutes", included: true },
        { feature: "Unlimited SMS", included: true },
        { feature: "No Contract", included: true },
        { feature: "International Calls", included: false },
        { feature: "5G Access", included: false },
      ],
    },
    {
      name: "Standard",
      price: planDuration === "monthly" ? "$19.99" : "$199.99",
      description: "Our most popular plan for everyday smartphone users.",
      color: "orange",
      popular: true,
      features: [
        { feature: "5GB Data", included: true },
        { feature: "Unlimited Minutes", included: true },
        { feature: "Unlimited SMS", included: true },
        { feature: "No Contract", included: true },
        { feature: "International Calls", included: true },
        { feature: "5G Access", included: false },
      ],
    },
    {
      name: "Premium",
      price: planDuration === "monthly" ? "$29.99" : "$299.99",
      description: "Unlimited everything for power users who need the best.",
      color: "purple",
      features: [
        { feature: "Unlimited Data", included: true },
        { feature: "Unlimited Minutes", included: true },
        { feature: "Unlimited SMS", included: true },
        { feature: "No Contract", included: true },
        { feature: "International Calls", included: true },
        { feature: "5G Access", included: true },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Perfect Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a range of plans to suit every need and budget. All plans include our award-winning network
            coverage and customer support.
          </p>

          <div className="mt-8">
            <Tabs defaultValue="monthly" className="w-full max-w-xs mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly" onClick={() => setPlanDuration("monthly")}>
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="yearly" onClick={() => setPlanDuration("yearly")}>
                  Yearly <span className="ml-1 text-xs text-green-600 font-medium">Save 15%</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden border ${
                plan.popular ? "border-orange-400" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{planDuration === "monthly" ? "month" : "year"}</span>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-full ${
                          feature.included ? `bg-${plan.color}-100 text-${plan.color}-600` : "bg-gray-100 text-gray-400"
                        } flex items-center justify-center`}
                      >
                        {feature.included && <Check className="h-3 w-3" />}
                      </div>
                      <span
                        className={`ml-2 text-sm ${feature.included ? "text-gray-700" : "text-gray-400 line-through"}`}
                      >
                        {feature.feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${
                    plan.popular ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-800 hover:bg-gray-900"
                  }`}
                >
                  Choose Plan
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
