"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollOverlayProps {
  authorImg: string
  participantImg: string
  participantCopyright: string
  participantCaption: string
  participantWidth: number
  participantHeight: number
}

export default function ScrollOverlay({
  authorImg,
  participantImg,
  participantCopyright,
  participantCaption,
  participantWidth,
  participantHeight,
}: ScrollOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const yOffset = useTransform(scrollYProgress, [0.2, 0.5], ["100vh", "0vh"])

  const bgDarkenOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 0.5])

  return (
    <div
      ref={containerRef}
      className="relative h-[250vh] w-full bg-theme-black my-20"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* jio's img */}
        <Image
          src={authorImg}
          alt="Alt text"
          fill
          className="object-cover"
          sizes="100vw"
        />

        <motion.div
          style={{ opacity: bgDarkenOpacity }}
          className="absolute inset-0 bg-black z-0"
        />

        {/* participant overlay img */}
        <motion.div
          style={{ y: yOffset }}
          className="relative z-10 max-w-lg w-full px-4"
        >
          <div className="bg-offwhite pb-6 w-full shadow-2xl">
            <Image
              src={participantImg}
              alt="Participant's image"
              width={participantWidth}
              height={participantHeight}
              className="w-full h-auto object-cover max-h-[60vh]"
              sizes="(max-width: 768px) 100vw, 512px"
            />
            <p className="font-libre text-[14px] text-offblack text-center mt-6">
              © {participantCopyright}
            </p>
          </div>
          <p className="caption-text text-theme-white mt-6 text-center shadow-black drop-shadow-md">
            {participantCaption}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
