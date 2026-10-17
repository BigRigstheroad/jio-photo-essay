"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"

function FadeLayer({
  src,
  index,
  total,
  scrollYProgress,
}: {
  src: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const step = 1 / (total - 1)

  // THE LEVER: Changed 0.1 to 0.35
  // This creates a massive pause where the opacity doesn't change at all.
  // The user scrolls a lot before startFade triggers, and it hits 100% opacity
  // well before the endFade boundary.
  const startFade = (index - 1) * step + step * 0.35
  const endFade = index * step - step * 0.35

  const opacity = useTransform(scrollYProgress, [startFade, endFade], [0, 1])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-10"
    >
      <Image
        src={src}
        alt={`Crossfade layer ${index + 1}`}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </motion.div>
  )
}

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

  // THE HEIGHT: Increased from 150vh to 200vh per image
  // This adds more physical scrolling distance to compensate for the longer "holds"
  const dynamicHeight = `${images.length * 200}vh`

  return (
    <div
      ref={containerRef}
      className="relative w-full my-20 bg-theme-black"
      style={{ height: dynamicHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src={images[0]}
          alt="Crossfade base layer"
          fill
          className="object-cover z-0"
          sizes="100vw"
          priority
        />

        {images.slice(1).map((src, i) => (
          <FadeLayer
            key={src}
            src={src}
            index={i + 1}
            total={images.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

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
