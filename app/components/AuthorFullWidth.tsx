"use client"
import { useRef } from "react"
import Image from "next/image"
import { useScroll } from "framer-motion"

interface AuthorFullWidthProps {
  src: string
  caption: string
}

export default function AuthorFullWidth({
  src,
  caption,
}: AuthorFullWidthProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // still use useScroll to make the section sticky (h-[200vh])
  // so it has the same pacing as the other interactive blocks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] w-full my-20 bg-theme-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <Image
          src={src}
          alt="Author perspective"
          fill
          className="object-cover z-0"
          sizes="100vw"
        />

        {/* persistent dark gradient for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/90 via-black/40 to-transparent z-20" />

        {/* caption */}
        <div className="absolute bottom-12 left-6 md:left-12 z-30 max-w-3xl">
          <p className="font-libre text-[18px] md:text-[22px] italic text-theme-white drop-shadow-md">
            {caption}
          </p>
        </div>
      </div>
    </div>
  )
}
