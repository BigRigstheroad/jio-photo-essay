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

  return (
    <div className="w-full flex flex-col items-center my-20 px-4">
      <div className="bg-offwhite w-fit max-w-[85vw] sm:max-w-sm md:max-w-md shadow-2xl flex flex-col items-center">
        <video
          ref={videoRef}
          src={src}
          preload="metadata"
          controls
          playsInline
          loop
          muted
          className="w-auto h-auto max-w-[85vw] sm:max-w-sm md:max-w-md max-h-[60vh] object-contain bg-offblack"
        />

        <div className="pt-4 pb-5 md:pt-6 md:pb-5 px-4 w-full">
          <p className="font-libre text-xs md:text-[14px] text-offblack text-center">
            {copyright}
          </p>
        </div>
      </div>

      {caption && (
        <p className="caption-text text-theme-white mt-4 md:mt-6 text-center max-w-2xl text-sm sm:text-base">
          {caption}
        </p>
      )}
    </div>
  )
}
