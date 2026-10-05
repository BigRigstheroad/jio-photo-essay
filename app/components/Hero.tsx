"use client"
import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "./Navbar"

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

  const fadeOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full bg-theme-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Navbar isFixed={false} />

        {/* initial hero img */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <Image
            src={src}
            alt="Hero background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>

        {/* scroll-triggered dark gradient */}
        <motion.div
          style={{ opacity: fadeOpacity }}
          className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10"
        />

        {/* scroll-triggered text content */}
        <motion.div
          style={{ opacity: fadeOpacity }}
          className="absolute bottom-12 left-6 md:left-12 z-20 max-w-4xl"
        >
          <h1 className="h1-title text-theme-yellow mb-2">{title}</h1>
          <h2 className="h2-subtitle text-theme-white">{subtitle}</h2>
        </motion.div>
      </div>
    </section>
  )
}
