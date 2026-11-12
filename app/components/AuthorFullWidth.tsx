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

  useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  return (
    <div
      ref={containerRef}
      className="relative h-[200vh] w-full my-20 bg-theme-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="relative w-full max-w-[177.78vh] aspect-video mx-auto">
          <Image
            src={src}
            alt={caption || "Author perspective"}
            fill
            quality={90}
            className="object-contain z-0"
            sizes="100vw"
          />

          {caption && (
            <>
              <div className="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/95 via-black/50 to-transparent z-20" />

              <div className="pointer-events-none absolute top-full inset-x-6 mt-3 text-center md:top-auto md:right-auto md:bottom-10 md:left-10 md:mt-0 md:text-left z-30 max-w-3xl">
                <p className="font-libre text-sm sm:text-base md:text-lg lg:text-[22px] italic text-theme-white drop-shadow-md leading-relaxed">
                  {caption}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
