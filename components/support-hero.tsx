import Image from "next/image"

export default function SupportHero() {
  return (
    <div className="w-full bg-[#FFF6EA] py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Image Grid */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
            {/* Row 1 */}
            <div className="col-span-2 md:col-span-2 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop"
                alt="Person on phone"
                fill
                className="object-cover"
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64">
              <Image
                src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1000&auto=format&fit=crop"
                alt="Family at sunset"
                fill
                className="object-cover"
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64">
              <Image
                src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?q=80&w=1000&auto=format&fit=crop"
                alt="Person with curly hair"
                fill
                className="object-cover"
              />
            </div>

            {/* Row 2 */}
            <div className="col-span-2 md:col-span-2 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64 md:mt-4">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
                alt="People with laptops"
                fill
                className="object-cover"
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64 md:mt-4">
              <Image
                src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000&auto=format&fit=crop"
                alt="Person with phone"
                fill
                className="object-cover"
              />
            </div>

            <div className="col-span-2 md:col-span-3 row-span-2 relative rounded-xl overflow-hidden h-48 md:h-64 md:mt-4">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop"
                alt="Home garden"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Central Message Banner */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-3/4 lg:w-2/3 z-10">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-center py-4 md:py-6 px-4 rounded-lg shadow-lg">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide">HELP IS HERE FOR YOU</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
