import Image from "next/image"

interface FeaturedProductCardProps {
  product: {
    id: string
    title: string
    image: string
    isNew?: boolean
  }
}

export default function FeaturedProductCard({ product }: FeaturedProductCardProps) {
  return (
    <div className="group relative bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md h-full">
      <div className="relative w-full h-full min-h-[400px]">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.isNew && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            New
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="font-medium text-xl text-white">{product.title}</h3>
      </div>
    </div>
  )
}
