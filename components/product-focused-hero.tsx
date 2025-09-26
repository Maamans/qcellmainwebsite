import Image from "next/image"

export default function ProductFocusedHero() {
  return (
    <div className="w-full bg-gray-50 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {/* Left column */}
          <div className="col-span-1 space-y-3 md:space-y-5">
            <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1573497019418-b400bb3ab074?q=80&w=1000&auto=format&fit=crop"
                alt="Woman with sunglasses"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=1000&auto=format&fit=crop"
                alt="Woman with tablet"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Middle left column */}
          <div className="col-span-1 space-y-3 md:space-y-5">
            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1617625802912-cde586faf331?q=80&w=1000&auto=format&fit=crop"
                alt="Smartwatch"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=80&w=1000&auto=format&fit=crop"
                alt="Person working on laptop"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Middle right column */}
          <div className="col-span-1 space-y-3 md:space-y-5">
            <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=1000&auto=format&fit=crop"
                alt="Video call on phone"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1511200016789-e7b694d0783a?q=80&w=1000&auto=format&fit=crop"
                alt="Phone in hand"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-1 space-y-3 md:space-y-5">
            <div className="relative rounded-xl overflow-hidden aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1516239482977-b550ba7253f2?q=80&w=1000&auto=format&fit=crop"
                alt="Friends sharing phone moments"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-[3/4]">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
                alt="Person with headphones"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
