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

  // 0% - 20%: author photo alone
  // 20% - 40%: participant slides in (100vh -> 0vh)
  // 40% - 70%: participant rests on screen
  // 70% - 90%: participant slides OUT (-100vh) and background brightens
  // 90% - 100%: author photo alone again before the next section
  const yOffset = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.7, 0.9],
    ["100vh", "0vh", "0vh", "-100vh"],
  )

  const bgDarkenOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.7, 0.9],
    [0, 0.5, 0.5, 0],
  )

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] w-full bg-theme-black my-20"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* jio's pic */}
        <Image
          src={authorImg}
          alt="Author's perspective background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* animation of black overlay fading in AND out */}
        <motion.div
          style={{ opacity: bgDarkenOpacity }}
          className="absolute inset-0 bg-black z-0"
        />

        {/* participant overlay image sliding up and away */}
        <motion.div
          style={{ y: yOffset }}
          className="relative z-10 max-w-lg w-full px-4"
        >
          <div className="bg-offwhite w-full shadow-2xl flex flex-col">
            <Image
              src={participantImg}
              alt="Participant's perspective overlay"
              width={participantWidth}
              height={participantHeight}
              className="w-full h-auto object-cover max-h-[60vh]"
              sizes="(max-width: 768px) 100vw, 512px"
            />
            <div className="pt-6 pb-6 px-4 w-full">
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
