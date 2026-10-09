"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollCrossfadeProps {
  images: string[]
  caption: string
}

export default function ScrollCrossfade({
  images,
  caption,
}: ScrollCrossfadeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // fade the second image in between 10% and 60% of the scroll depth
  const image2Opacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1])

  return (
    <div
      ref={containerRef}
      className="relative h-[250vh] w-full my-20 bg-theme-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* base img */}
        <Image
          src={images[0]}
          alt="Crossfade base layer"
          fill
          className="object-cover z-0"
          sizes="100vw"
          priority
        />

        {/* fading image overlay */}
        {images[1] && (
          <motion.div
            style={{ opacity: image2Opacity }}
            className="absolute inset-0 z-10"
          >
            <Image
              src={images[1]}
              alt="Crossfade top layer"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* persistent dark gradient for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/90 via-black/40 to-transparent z-20" />

        {/* persistent text content */}
        <div className="absolute bottom-32 left-6 md:left-12 z-30 max-w-3xl">
          <p className="font-montserrat text-xs md:text-sm font-semibold uppercase tracking-widest text-theme-yellow mb-2 drop-shadow-md">
            Interactive - scrollable
          </p>
          <p className="font-libre text-2xl italic text-theme-white drop-shadow-md">
            {caption}
          </p>
        </div>
      </div>
    </div>
  )
}
