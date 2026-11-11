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
        className="object-contain lg:object-cover z-0"
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

  let input: number[] = []
  let output: number[] = []

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
      className="font-libre text-sm sm:text-base md:text-lg lg:text-[22px] italic text-theme-white drop-shadow-md col-start-1 row-start-1 leading-relaxed"
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
        <div className="relative w-full aspect-video md:h-full md:aspect-auto">
          <Image
            src={images[0]}
            alt="Crossfade base layer"
            fill
            className="object-contain lg:object-cover z-0"
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

          <div className="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/95 via-black/50 to-transparent z-20" />

          {showLabel && (
            <p className="md:hidden pointer-events-none absolute bottom-full inset-x-6 mb-2.5 text-center font-montserrat text-xs font-semibold uppercase tracking-widest text-theme-yellow z-30 drop-shadow-md">
              Interactive - scrollable
            </p>
          )}

          <div className="pointer-events-none absolute top-full inset-x-6 mt-3 text-center md:top-auto md:right-auto md:bottom-10 md:left-12 md:mt-0 md:text-left z-30 max-w-3xl">
            {showLabel && (
              <p className="hidden md:block font-montserrat text-xs md:text-sm font-semibold uppercase tracking-widest text-theme-yellow mb-1.5 drop-shadow-md">
                Interactive - scrollable
              </p>
            )}

            {captions.length === 1 ? (
              <p className="font-libre text-sm sm:text-base md:text-lg lg:text-[22px] italic text-theme-white drop-shadow-md leading-relaxed">
                {captions[0]}
              </p>
            ) : (
              <div className="grid items-start">
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
    </div>
  )
}
