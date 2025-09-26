import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SupportOptions() {
  return (
    <div className="w-full bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-medium mb-10">
            <span className="text-gray-900">Help is here.</span>{" "}
            <span className="text-gray-500">Whenever and however you need it.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: In-person specialist */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">QCELL Specialist</div>
                <h3 className="text-2xl font-medium mb-4">Shop one on one with a Specialist. Online or in a store.</h3>
                <div className="relative h-64 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1000&auto=format&fit=crop"
                    alt="Apple Specialist"
                    fill
                    className="object-cover object-center rounded-lg"
                  />
                </div>
                <Button variant="ghost" className="mt-4 px-0 font-normal text-black hover:text-gray-700">
                  Find a specialist <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Card 2: Video specialist */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="uppercase text-sm font-medium text-gray-500 mb-2">Video Shopping</div>
                <h3 className="text-2xl font-medium mb-4">Shop with a Specialist over video.</h3>
                <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className="relative h-56 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1000&auto=format&fit=crop"
                    alt="Video Shopping"
                    fill
                    className="object-cover object-center rounded-lg"
                  />
                </div>
                <Button variant="ghost" className="mt-4 px-0 font-normal text-black hover:text-gray-700">
                  Connect now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Card 3: Visit store (gradient card) */}
            <div className="rounded-xl overflow-hidden shadow-sm relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500"></div>
              <div className="relative p-6 h-full flex flex-col">
                <div className="uppercase text-sm font-medium text-white/80 mb-2">Today at QCELL</div>
                <h3 className="text-2xl font-medium mb-4 text-white">Join us at your local QCELL Store.</h3>
                <p className="text-white/90 mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae adipisci fugit dolorem quidem.
                </p>
                <div className="relative h-48 w-full mt-auto mb-6 rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=1000&auto=format&fit=crop"
                    alt="Apple Store"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <Button className="mt-auto bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800">
                  Find a store near you <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
