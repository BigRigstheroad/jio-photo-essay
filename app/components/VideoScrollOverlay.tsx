"use client"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

interface ScrollVideoOverlayProps {
  clientImg: string
  participantVideoSrc: string
  participantCopyright: string
  participantCaption: string
}

export default function ScrollVideoOverlay({
  clientImg,
  participantVideoSrc,
  participantCopyright,
  participantCaption,
}: ScrollVideoOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // 1. The Scroll Animation Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const yOffset = useTransform(scrollYProgress, [0.2, 0.6], ["100vh", "0vh"])
  const bgDarkenOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.5])

  const videoCardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const isInView = useInView(videoCardRef, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    if (isInView) {
      videoRef.current?.play().catch(() => {
        // prevents errors if browser blocks autoplay
        console.log("Autoplay blocked by browser")
      })
    } else {
      videoRef.current?.pause()
    }
  }, [isInView])

  return (
    <div
      ref={containerRef}
      className="relative h-[300vh] w-full bg-theme-black my-20"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src={clientImg}
          alt="Author's perspective background"
          fill
          className="object-cover"
          sizes="100vw"
        />

        <motion.div
          style={{ opacity: bgDarkenOpacity }}
          className="absolute inset-0 bg-black z-0"
        />

        <motion.div
          ref={videoCardRef}
          style={{ y: yOffset }}
          className="relative z-10 max-w-lg w-full px-4"
        >
          <div className="bg-offwhite w-full shadow-2xl flex flex-col">
            <div className="relative w-full aspect-3/4 bg-black">
              <video
                ref={videoRef}
                src={participantVideoSrc}
                preload="metadata"
                controls
                playsInline
                loop
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-6 pb-10 px-4 w-full">
              <p className="font-libre text-[14px] text-offblack text-center">
                © {participantCopyright}
              </p>
            </div>
          </div>

          <p className="caption-text text-theme-white mt-6 text-center shadow-black drop-shadow-md">
            {participantCaption}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
