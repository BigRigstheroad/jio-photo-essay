"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollOverlayProps {
  authorImg1: string
  authorImg2?: string
  participantImg: string
  participantCopyright: string
  participantCaption: string
  participantWidth: number
  participantHeight: number
}

export default function ScrollOverlay({
  authorImg1,
  authorImg2,
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

  const img2Opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1])

  return (
    <div
      ref={containerRef}
      className="relative h-[400vh] w-full bg-theme-black my-20"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src={authorImg1}
          alt="Author's perspective background 1"
          fill
          quality={90}
          className="object-contain z-0"
          sizes="100vw"
        />

        {authorImg2 && (
          <motion.div
            style={{ opacity: img2Opacity }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={authorImg2}
              alt="Author's perspective background 2"
              fill
              quality={90}
              className="object-contain z-0"
              sizes="100vw"
            />
          </motion.div>
        )}

        <motion.div
          style={{ opacity: bgDarkenOpacity }}
          className="pointer-events-none absolute inset-0 bg-black z-0"
        />

        <motion.div
          style={{ y: yOffset }}
          className="relative z-10 w-full flex flex-col items-center px-4"
        >
          <div className="bg-offwhite w-fit max-w-[78vw] sm:max-w-xs md:max-w-sm shadow-2xl flex flex-col items-center">
            <Image
              src={participantImg}
              alt="Participant's perspective overlay"
              width={participantWidth}
              height={participantHeight}
              quality={90}
              className="w-auto h-auto max-w-[78vw] sm:max-w-xs md:max-w-sm max-h-[50vh] md:max-h-[55vh] object-contain bg-black"
              sizes="(max-width: 768px) 78vw, 384px"
            />
            <div className="pt-4 pb-5 md:pt-5 md:pb-7 px-4 w-full">
              <p className="font-libre text-xs md:text-[14px] text-offblack text-center">
                {/* © */} {participantCopyright}
              </p>
            </div>
          </div>
          {participantCaption && (
            <p className="caption-text text-theme-white mt-4 md:mt-5 text-center max-w-lg text-sm sm:text-base shadow-black drop-shadow-md">
              {participantCaption}
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
