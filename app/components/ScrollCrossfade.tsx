"use client"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion"

export type CrossfadeStep =
  | {
      kind: "author"
      src: string
      caption?: string
    }
  | {
      kind: "participant-photo"
      src: string
      copyright: string
      caption?: string
    }
  | {
      kind: "participant-video"
      src: string
      copyright: string
      caption?: string
    }

function getStepWindow(index: number, total: number) {
  const step = 1 / (total - 1)
  return {
    fadeInStart: (index - 1) * step + step * 0.35,
    fadeInEnd: index * step - step * 0.35,
    fadeOutStart: index * step + step * 0.35,
    fadeOutEnd: (index + 1) * step - step * 0.35,
  }
}

function AuthorImageLayer({
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
  const { fadeInStart, fadeInEnd } = getStepWindow(index, total)
  const opacity = useTransform(
    scrollYProgress,
    [fadeInStart, fadeInEnd],
    [0, 1],
  )

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-10"
    >
      <Image
        src={src}
        alt={`Crossfade layer ${index + 1}`}
        fill
        quality={90}
        className="object-contain z-0"
        quality={90}
        className="object-contain z-0"
        sizes="100vw"
      />
    </motion.div>
  )
}

function AuthorCaptionGradient({
  index,
  total,
  scrollYProgress,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const { fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd } = getStepWindow(
    index,
    total,
  )

  let input: number[]
  let output: number[]

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
    <motion.div
      style={{ opacity }}
      className="hidden md:block pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/90 via-black/40 to-transparent z-20"
    />
  )
}

function AuthorCaptionLayer({
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
  const { fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd } = getStepWindow(
    index,
    total,
  )

  let input: number[]
  let output: number[]

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

function OverlayDimLayer({
  index,
  total,
  scrollYProgress,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const { fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd } = getStepWindow(
    index,
    total,
  )
  const isLast = index === total - 1

  const input = isLast
    ? [0, fadeInStart, fadeInEnd, 1]
    : [0, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, 1]

  const output = isLast ? [0, 0, 0.55, 0.55] : [0, 0, 0.55, 0.55, 0, 0]

  const opacity = useTransform(scrollYProgress, input, output)

  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-0 bg-black z-20"
    />
  )
}

function ParticipantCardLayer({
  step,
  index,
  total,
  scrollYProgress,
  isContainerInView,
}: {
  step: Extract<
    CrossfadeStep,
    { kind: "participant-photo" | "participant-video" }
  >
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  isContainerInView: boolean
}) {
  const { fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd } = getStepWindow(
    index,
    total,
  )
  const isLast = index === total - 1

  const input = isLast
    ? [0, fadeInStart, fadeInEnd, 1]
    : [0, fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd, 1]

  const opacityOutput = isLast ? [0, 0, 1, 1] : [0, 0, 1, 1, 0, 0]
  const yOutput = isLast
    ? ["8vh", "8vh", "0vh", "0vh"]
    : ["8vh", "8vh", "0vh", "0vh", "-8vh", "-8vh"]

  const opacity = useTransform(scrollYProgress, input, opacityOutput)
  const y = useTransform(scrollYProgress, input, yOutput)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(false)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const active = isLast
      ? latest >= fadeInStart
      : latest >= fadeInStart && latest <= fadeOutEnd
    if (active !== isActive) {
      setIsActive(active)
    }
  })

  useEffect(() => {
    if (step.kind !== "participant-video") return
    if (isActive && isContainerInView) {
      videoRef.current?.play().catch(() => {})
    } else {
      videoRef.current?.pause()
    }
  }, [isActive, isContainerInView, step.kind])

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 z-40 flex items-center justify-center px-4 ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="w-full flex flex-col items-center">
        <div className="bg-offwhite w-fit max-w-[82vw] sm:max-w-sm md:max-w-md shadow-2xl flex flex-col items-center">
          {step.kind === "participant-photo" ? (
            <Image
              src={step.src}
              alt={step.caption || "Participant perspective"}
              width={2048}
              height={2048}
              quality={90}
              className="w-auto h-auto max-w-[82vw] sm:max-w-sm md:max-w-md max-h-[50vh] md:max-h-[55vh] object-contain bg-black"
              sizes="(max-width: 768px) 82vw, 448px"
            />
          ) : (
            <video
              ref={videoRef}
              src={step.src}
              preload="metadata"
              controls
              playsInline
              loop
              muted
              className="w-auto h-auto max-w-[82vw] sm:max-w-sm md:max-w-md max-h-[50vh] md:max-h-[55vh] object-contain bg-black"
            />
          )}

          <div className="pt-4 pb-5 md:pt-5 md:pb-6 px-4 w-full">
            <p className="font-libre text-xs md:text-[14px] text-offblack text-center">
              {step.copyright}
            </p>
          </div>
        </div>

        {step.caption && (
          <p className="caption-text text-theme-white mt-4 md:mt-5 text-center max-w-xl text-sm sm:text-base shadow-black drop-shadow-md">
            {step.caption}
          </p>
        )}
      </div>
    </motion.div>
  )
}

interface ScrollCrossfadeProps {
  steps: CrossfadeStep[]
  showLabel?: boolean
}

export default function ScrollCrossfade({
  steps,
  showLabel = false,
}: ScrollCrossfadeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isContainerInView = useInView(containerRef, { margin: "0px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const dynamicHeight = `${steps.length * 200}vh`

  return (
    <div
      ref={containerRef}
      className="relative w-full my-20 bg-offblack"
      style={{ height: dynamicHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-linear-to-b from-offblack via-theme-black to-offblack">
        <div className="relative w-full max-w-[177.78vh] aspect-video mx-auto">
          <div className="pointer-events-none absolute bottom-full inset-x-[-50vw] h-[50vh] bg-linear-to-b from-offblack via-neutral-900 to-theme-black z-0" />
          <div className="pointer-events-none absolute top-full inset-x-[-50vw] h-[50vh] bg-linear-to-t from-offblack via-neutral-900 to-theme-black z-0" />

          <Image
            src={steps[0].src}
            alt="Crossfade base layer"
            fill
            quality={90}
            className="object-contain z-0"
            quality={90}
            className="object-contain z-0"
            sizes="100vw"
          />

          {steps.map((step, i) => {
            if (i === 0 || step.kind !== "author") return null
            return (
              <AuthorImageLayer
                key={`${step.src}-${i}`}
                src={step.src}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            )
          })}

          {steps.map((step, i) => {
            if (step.kind !== "author" || !step.caption) return null
            return (
              <AuthorCaptionGradient
                key={`grad-${i}`}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            )
          })}

          {steps.map((step, i) => {
            if (step.kind === "author") return null
            return (
              <OverlayDimLayer
                key={`dim-${i}`}
                index={i}
                total={steps.length}
                scrollYProgress={scrollYProgress}
              />
            )
          })}

          {showLabel && (
            <p className="md:hidden pointer-events-none absolute bottom-full inset-x-6 mb-2.5 text-center font-montserrat text-xs font-semibold uppercase tracking-widest text-theme-yellow z-30 drop-shadow-md">
              Interactive - scrollable
            </p>
          )}

          <div className="pointer-events-none absolute top-full inset-x-6 mt-3 text-center md:top-auto md:right-auto md:bottom-10 md:left-10 md:mt-0 md:text-left z-30 max-w-3xl">
          <div className="pointer-events-none absolute top-full inset-x-6 mt-3 text-center md:top-auto md:right-auto md:bottom-10 md:left-10 md:mt-0 md:text-left z-30 max-w-3xl">
            {showLabel && (
              <p className="hidden md:block font-montserrat text-xs md:text-sm font-semibold uppercase tracking-widest text-theme-yellow mb-1.5 drop-shadow-md">
                Interactive - scrollable
              </p>
            )}

            <div className="grid items-start">
              {steps.map((step, i) => {
                if (step.kind !== "author" || !step.caption) return null
                return (
                  <AuthorCaptionLayer
                    key={`cap-${i}`}
                    text={step.caption}
                    index={i}
                    total={steps.length}
                    scrollYProgress={scrollYProgress}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {steps.map((step, i) => {
          if (step.kind === "author") return null
          return (
            <ParticipantCardLayer
              key={`overlay-${step.src}-${i}`}
              step={step}
              index={i}
              total={steps.length}
              scrollYProgress={scrollYProgress}
              isContainerInView={isContainerInView}
            />
          )
        })}
      </div>
    </div>
  )
}
