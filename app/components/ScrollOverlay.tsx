"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollOverlayProps {
  clientImg: string
  participantImg: string
  participantCopyright: string
  participantCaption: string
  participantWidth: number
  participantHeight: number
}

export default function ScrollOverlay({
  clientImg,
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

  // slide the participant photo up from below the viewport to the center
  const yOffset = useTransform(scrollYProgress, [0.3, 1], ["100vh", "0vh"])

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] w-full bg-theme-black my-20"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* background base img */}
        <Image
          src={clientImg}
          alt="Author's perspective background"
          fill
          className="object-cover brightness-50"
          sizes="100vw"
        />

        {/* participant image sliding up */}
        <motion.div
          style={{ y: yOffset }}
          className="relative z-10 max-w-lg w-full px-4"
        >
          <div className="bg-offwhite p-4 pb-10 w-full shadow-2xl">
            <Image
              src={participantImg}
              alt="Participant's perspective overlay"
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
