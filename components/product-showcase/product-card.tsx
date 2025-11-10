import Image from "next/image"

interface ProductCardProps {
  product: {
    id: string
    title: string
    image: string
    isNew?: boolean
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-gray-50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {product.isNew && (
        <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">New</div>
      )}

      <div className="p-4 text-center">
        <h3 className="font-medium text-lg">{product.title}</h3>
      </div>
    </div>
  )
}
