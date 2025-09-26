import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, Mail } from "lucide-react"

export default function SupportContact() {
  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:w-[70%] bg-white rounded-lg p-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Support On Your Phone</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Simply dial 111 from your line to speak with our support team, or chat live with our chatbot for quick
            assistance anytime, anywhere.
          </p>
          <Button variant="link" className="text-orange-500 font-medium text-lg mt-4 hover:text-orange-600">
            Visit live chat
          </Button>
        </div>

        {/* Illustration */}
        <div className="relative h-64 md:h-80 max-w-3xl mx-auto mb-16">
          {/* Colorful background shapes */}
          <div className="absolute left-0 top-0 w-20 h-32 bg-blue-200 rounded-lg opacity-80"></div>
          <div className="absolute left-[15%] bottom-0 w-28 h-28 bg-green-200 rounded-full opacity-80"></div>
          <div className="absolute left-[30%] top-[20%] w-36 h-24 bg-purple-200 rounded-full opacity-70"></div>
          <div className="absolute right-[20%] top-[10%] w-40 h-32 bg-blue-100 rounded-lg opacity-80 transform rotate-45"></div>
          <div className="absolute right-[10%] bottom-[20%] w-32 h-32 bg-green-200 rounded-full opacity-80"></div>
          <div className="absolute right-[30%] bottom-[10%] w-36 h-20 bg-pink-200 rounded-lg opacity-70"></div>

          {/* Message icons */}
          <div className="absolute left-[10%] top-[30%] w-16 h-16 bg-blue-300 rounded-lg opacity-90 flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <div className="absolute left-[25%] top-[15%] w-24 h-20 bg-blue-100 rounded-lg transform rotate-12 opacity-90 flex items-center justify-center">
            <Mail className="h-10 w-10 text-blue-400" />
          </div>

          {/* Avatar */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop"
              alt="Support Agent"
              width={150}
              height={150}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>

        {/* Contact options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-orange-500 font-bold text-3xl md:text-4xl mb-2">24/7</div>
            <div className="text-orange-500 font-medium text-xl">Live Chat</div>
          </div>

          <div className="text-center">
            <div className="text-orange-500 font-bold text-3xl md:text-4xl mb-2">CALL</div>
            <div className="text-orange-500 font-medium text-xl">111</div>
          </div>

          <div className="text-center">
            <div className="text-orange-500 font-bold text-3xl md:text-4xl mb-2">Email</div>
            <div className="text-orange-500 font-medium text-xl">support@example.com</div>
          </div>
        </div>
      </div>
    </div>
  )
}
