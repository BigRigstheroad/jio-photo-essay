"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ScrollCrossfadeProps {
  images: string[]
}

export default function ScrollCrossfade({ images }: ScrollCrossfadeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // fade the second image in between 20% and 80% of the scroll depth
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
          className="object-cover"
          sizes="100vw"
          priority
        />

        {/* fading image overlay */}
        {images[1] && (
          <motion.div
            style={{ opacity: image2Opacity }}
            className="absolute inset-0"
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
      </div>
    </div>
  )
}
