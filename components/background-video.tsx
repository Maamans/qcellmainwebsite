import { useRef, useState } from 'react'
import { Play, Pause} from "lucide-react"
import { motion } from "framer-motion"

export default function BackgroundVideo({poster, videoSource, muted = true, loop = true, autoPlay = true}: {poster: string, videoSource: string, muted?: boolean, loop?: boolean, autoPlay?: boolean}) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)

    const toggleVideo = () => {
        if (videoRef.current) {
        if (isPlaying) {
            videoRef.current.pause()
        } else {
            videoRef.current.play()
        }
        setIsPlaying(!isPlaying)
        }
    }

    return (
        <>
        <div className="absolute inset-0 z-0">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              poster={poster}
              loop={loop}
              muted={muted}
              playsInline
              autoPlay={autoPlay}
            >
              <source src={videoSource} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#F98F1F] mix-blend-overlay"></div>
        </div>

        {/* Video Controls */}
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={toggleVideo}
            className="absolute bottom-8 right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </motion.button>
        </>
    )
}