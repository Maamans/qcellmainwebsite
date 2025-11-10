import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import VideoModal from "./video-modal"
import { useState } from "react"

export default function LifeAtQcell() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
    <div className="flex flex-col w-full bg-[#6E400D] text-white">
      {/* Top section */}
      <div className="p-8 pb-12 flex flex-col items-center text-center mt-[150px]">
        <p className="text-2xl sm:text-3xl md:text-5xl mb-2">Life at Qcell</p>

        <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold my-10">
            Do great work with <span className="text-amber-400">good people</span>.
        </h2>

        <p className="text-xl sm:2xl md:text-3xl mb-6 sm:max-w-xl md:max-w-2xl">
        Be part of a culture built on trust, growth, and real impact. 
        We support each other, learn from one another, and create work that matters — together.
        </p>

        <Link href="#" className="text-blue-400 text-sm flex items-center mt-14 hover:underline">
          Learn about Life at Qcell &gt;
        </Link>
      </div>

      {/* Bottom section with image and quote */}
      <div className="relative">
        <Image
          src="/images/mechanical-engineer.jpg"
          alt="Qcell employee"
          width={500}
          height={400}
          className="w-full h-[800px] object-cover object-center"
        />

        <div className="absolute top-2/4 -translate-y-2/4 left-20 right-0 p-8">
          <blockquote className="mb-2">
            <p className="text-xl sm:text-2xl md:text-3xl xl:text-5xl font-bold md:max-w-md">&quot;&apos;Be creative&apos;, was my welcome message.&quot;</p>
          </blockquote>

          <p className="text-xs my-10 md:text-[20px] md:my-14 lg:my-24 ">David, Software Intern</p>

          <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 text-xs">
            <span className="flex items-center justify-center w-5 h-5 rounded-full border border-white">
              <Play size={12} />
            </span>
            <span className="md:text-xl">Watch the Film</span>
          </button>
        </div>
        <div className="absolute inset-0 bg-black/80 z-10 opacity-25" />
      </div>
    </div>
    {isModalOpen && (
        /*<VideoModal source="/video/apple.mp4"/> isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>*/

        <VideoModal source="/videos/apple.mp4" isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>

      )
    }
    </>
  )
}
