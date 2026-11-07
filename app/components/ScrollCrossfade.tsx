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

function FadeCaption({
  text,
  index,
  total,
  scrollYProgress,
}: {
  text: string
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const step = 1 / (total - 1)

  const fadeInStart = (index - 1) * step + step * 0.35
  const fadeInEnd = index * step - step * 0.35

  const fadeOutStart = index * step + step * 0.35
  const fadeOutEnd = (index + 1) * step - step * 0.35

  let input = []
  let output = []

  if (index === 0) {
    input = [0, fadeOutStart, fadeOutEnd, 1]
    output = [1, 1, 0, 0]
  } else if (index === total - 1) {
    input = [0, fadeInStart, fadeInEnd, 1]
    output = [0, 0, 1, 1]
  } else {
    input = [0, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, 1]
    output = [0, 0, 1, 1, 0, 0]
  }

  const opacity = useTransform(scrollYProgress, input, output)

  return (
    <motion.p
      style={{ opacity }}
      // col-start-1 row-start-1
      className="font-libre text-2xl italic text-theme-white drop-shadow-md col-start-1 row-start-1"
    >
      {text}
    </motion.p>
  )
}

interface ScrollCrossfadeProps {
  images: string[]
  captions: string[]
  showLabel?: boolean
}

export default function ScrollCrossfade({
  images,
  captions,
  showLabel = false,
}: ScrollCrossfadeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

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

        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/90 via-black/40 to-transparent z-20" />

        <div className="absolute bottom-32 left-6 md:left-12 z-30 max-w-3xl">
          {showLabel && (
            <p className="font-montserrat text-xs md:text-sm font-semibold uppercase tracking-widest text-theme-yellow mb-2 drop-shadow-md">
              Interactive - scrollable
            </p>
          )}

          {captions.length === 1 ? (
            <p className="font-libre text-2xl italic text-theme-white drop-shadow-md">
              {captions[0]}
            </p>
          ) : (
            <div className="grid">
              {images.map((_, i) => (
                <FadeCaption
                  key={i}
                  text={captions[i] || ""}
                  index={i}
                  total={images.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
