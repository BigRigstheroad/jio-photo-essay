"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Navbar from "./Navbar"

export default function Hero({
  src,
  title,
  subtitle,
}: {
  src: string
  title: string
  subtitle: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // map scroll progress (0 to 1) to opacity (0 to 1)
  // text and gradient start fading in after scrolling 30% of the hero container
  const fadeOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1])

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] w-full bg-theme-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <Navbar isFixed={false} />

        {/* initial hero image (fades in from black on initial page load) */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src={src}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

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
