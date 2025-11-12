import Image from 'next/image'

const cards = [
  {
    image: "/images/qpower.jpg",
    title: "QPower",
    desc: "Uninterrupted power for your devices, anytime, anywhere.",
    cta: "Learn More",
    bg: "from-orange-100 via-white to-orange-200"
  },
  {
    image: "/images/qmusic.jpg",
    title: "Qcell Music",
    desc: "Stream your favorite songs and discover new music with Qcell Music.",
    cta: "Try Now",
    bg: "from-purple-100 via-white to-purple-200"
  }
]

export default function QPowerMusicSlider() {
  return (
    <div className="w-full overflow-x-auto pb-8">
      <div className="flex gap-6 min-w-[600px]">
        {cards.map((card, idx) => (
          <div key={idx} className={`relative w-80 h-56 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br ${card.bg} flex-shrink-0`}>
            <Image src={card.image} alt={card.title} fill className="object-cover opacity-70" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative z-10 p-6 flex flex-col h-full justify-end">
              <h3 className="text-2xl font-bold text-white mb-1 drop-shadow">{card.title}</h3>
              <p className="text-white/90 mb-2">{card.desc}</p>
              <a href="#" className="inline-block bg-[#F98F1F] text-white px-4 py-1 rounded-full text-sm font-medium shadow hover:bg-[#d97706] transition-colors">{card.cta}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
