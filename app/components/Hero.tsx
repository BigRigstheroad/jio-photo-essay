"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
// import Navbar from "./Navbar"

interface HeroProps {
  src: string
  title: string
  subtitle: string
}

export default function Hero({ src, title, subtitle }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const fadeOpacity = useTransform(scrollYProgress, [0.02, 0.15], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] w-full bg-offblack"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-linear-to-b from-offblack via-theme-black to-offblack">
        {/* <Navbar isFixed={false} /> */}

        <div className="relative w-full max-w-[177.78vh] aspect-video mx-auto">
          <div className="pointer-events-none absolute bottom-full inset-x-[-50vw] h-[50vh] bg-linear-to-b from-offblack via-neutral-900 to-theme-black z-0" />
          <div className="pointer-events-none absolute top-full inset-x-[-50vw] h-[50vh] bg-linear-to-t from-offblack via-neutral-900 to-theme-black z-0" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full z-0"
          >
            <Image
              src={src}
              alt="Hero background"
              fill
              quality={90}
              className="object-contain z-0"
              sizes="100vw"
              priority
            />
          </motion.div>

          <motion.div
            style={{ opacity: fadeOpacity }}
            className="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/50 to-transparent z-10"
          />

          <motion.h1
            style={{ opacity: fadeOpacity }}
            className="md:hidden pointer-events-none absolute bottom-full inset-x-6 mb-3 text-center h1-title text-theme-yellow text-2xl sm:text-3xl z-20 drop-shadow-md"
          >
            {title}
          </motion.h1>

          <motion.div
            style={{ opacity: fadeOpacity }}
            className="pointer-events-none absolute top-full inset-x-6 mt-3 text-center md:top-auto md:right-auto md:bottom-10 md:left-10 md:mt-0 md:text-left z-20 max-w-4xl"
          >
            <h1 className="hidden md:block h1-title text-theme-yellow md:text-4xl lg:text-5xl mb-2 drop-shadow-md">
              {title}
            </h1>
            <h2 className="h2-subtitle text-theme-yellow text-base sm:text-lg md:text-xl lg:text-2xl drop-shadow-md">
              {subtitle}
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
