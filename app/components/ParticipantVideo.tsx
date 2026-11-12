"use client"
import { useRef, useEffect } from "react"
import { useInView } from "framer-motion"

interface ParticipantVideoProps {
  src: string
  copyright: string
  caption?: string
  aspectRatio?: "3/2" | "3/4"
}

export function ParticipantVideo({
  src,
  copyright,
  caption,
  aspectRatio = "3/4",
}: ParticipantVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const isInView = useInView(videoRef, { margin: "-20% 0px -20% 0px" })

  useEffect(() => {
    if (isInView) {
      videoRef.current?.play().catch(() => {})
    } else {
      videoRef.current?.pause()
    }
  }, [isInView])

  const aspectClass = aspectRatio === "3/4" ? "aspect-[3/4]" : "aspect-[3/2]"

  return (
    <div className="max-w-[85vw] sm:max-w-sm md:max-w-md mx-auto w-full flex flex-col items-center my-20 px-4">
      <div className="bg-offwhite w-full shadow-2xl flex flex-col">
        <div className={`relative w-full bg-black ${aspectClass}`}>
          <video
            ref={videoRef}
            src={src}
            preload="metadata"
            controls
            playsInline
            loop
            muted
            className="w-full h-full object-cover"
          />
        </div>

        <div className="pt-6 pb-6 px-4 w-full">
          <p className="font-libre text-[14px] text-offblack text-center">
            {/* © */} {copyright}
          </p>
        </div>
      </div>

      {caption && (
        <p className="caption-text text-theme-white mt-6 text-center max-w-2xl">
          {caption}
        </p>
      )}
    </div>
  )
}
