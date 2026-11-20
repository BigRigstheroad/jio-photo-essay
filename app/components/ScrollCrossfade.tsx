"use client"
import { useRef, useEffect, useState, useMemo } from "react"
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

interface ComputedStep {
  step: CrossfadeStep
  stepIndex: number
  beatIndex: number
  nextAuthorBeatIndex: number | null
  hasReturnBeat: boolean
}

function buildTimeline(steps: CrossfadeStep[]) {
  let currentBeat = 0

  const computed: ComputedStep[] = steps.map((step, stepIndex) => {
    const beatIndex = currentBeat
    const isParticipant = step.kind !== "author"
    const isLast = stepIndex === steps.length - 1
    const hasReturnBeat = isParticipant && !isLast

    currentBeat += hasReturnBeat ? 2 : 1

    return {
      step,
      stepIndex,
      beatIndex,
      nextAuthorBeatIndex: null,
      hasReturnBeat,
    }
  })

  for (let i = 0; i < computed.length; i++) {
    if (computed[i].step.kind !== "author") continue
    for (let j = i + 1; j < computed.length; j++) {
      if (computed[j].step.kind === "author") {
        computed[i].nextAuthorBeatIndex = computed[j].beatIndex
        break
      }
    }
  }

  return { computed, totalBeats: currentBeat }
}

function getTransition(fromBeat: number, totalBeats: number, margin: number) {
  if (totalBeats <= 1) return { start: 0, end: 1 }
  const unit = 1 / (totalBeats - 1)
  return {
    start: fromBeat * unit + unit * margin,
    end: (fromBeat + 1) * unit - unit * margin,
  }
}

function getAuthorPresenceCurve(
  beatIndex: number,
  nextAuthorBeatIndex: number | null,
  totalBeats: number,
) {
  const fadeIn =
    beatIndex > 0 ? getTransition(beatIndex - 1, totalBeats, 0.35) : null
  const fadeOut =
    nextAuthorBeatIndex !== null
      ? getTransition(nextAuthorBeatIndex - 1, totalBeats, 0.35)
      : null

  if (!fadeIn && !fadeOut) {
    return { input: [0, 1], output: [1, 1] }
  }
  if (!fadeIn && fadeOut) {
    return {
      input: [0, fadeOut.start, fadeOut.end, 1],
      output: [1, 1, 0, 0],
    }
  }
  if (fadeIn && !fadeOut) {
    return {
      input: [0, fadeIn.start, fadeIn.end, 1],
      output: [0, 0, 1, 1],
    }
  }
  return {
    input: [0, fadeIn!.start, fadeIn!.end, fadeOut!.start, fadeOut!.end, 1],
    output: [0, 0, 1, 1, 0, 0],
  }
}

function AuthorImageLayer({
  src,
  beatIndex,
  totalBeats,
  scrollYProgress,
}: {
  src: string
  beatIndex: number
  totalBeats: number
  scrollYProgress: MotionValue<number>
}) {
  const { start, end } = getTransition(beatIndex - 1, totalBeats, 0.35)
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 z-10"
    >
      <Image
        src={src}
        alt={`Crossfade layer ${beatIndex + 1}`}
        fill
        quality={90}
        draggable={false}
        className="object-contain z-0"
        sizes="100vw"
      />
    </motion.div>
  )
}

function AuthorCaptionGradient({
  beatIndex,
  nextAuthorBeatIndex,
  totalBeats,
  scrollYProgress,
}: {
  beatIndex: number
  nextAuthorBeatIndex: number | null
  totalBeats: number
  scrollYProgress: MotionValue<number>
}) {
  const { input, output } = getAuthorPresenceCurve(
    beatIndex,
    nextAuthorBeatIndex,
    totalBeats,
  )
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
  beatIndex,
  nextAuthorBeatIndex,
  totalBeats,
  scrollYProgress,
}: {
  text: string
  beatIndex: number
  nextAuthorBeatIndex: number | null
  totalBeats: number
  scrollYProgress: MotionValue<number>
}) {
  const { input, output } = getAuthorPresenceCurve(
    beatIndex,
    nextAuthorBeatIndex,
    totalBeats,
  )
  const opacity = useTransform(scrollYProgress, input, output)

  return (
    <motion.p
      style={{ opacity }}
      className="font-libre text-xs sm:text-sm md:text-lg lg:text-[22px] italic text-theme-white drop-shadow-md col-start-1 row-start-1 leading-relaxed"
    >
      {text}
    </motion.p>
  )
}

function OverlayDimLayer({
  beatIndex,
  hasReturnBeat,
  totalBeats,
  scrollYProgress,
}: {
  beatIndex: number
  hasReturnBeat: boolean
  totalBeats: number
  scrollYProgress: MotionValue<number>
}) {
  const enter = getTransition(beatIndex - 1, totalBeats, 0.3)
  const exit = hasReturnBeat ? getTransition(beatIndex, totalBeats, 0.3) : null

  const input = exit
    ? [0, enter.start, enter.end, exit.start, exit.end, 1]
    : [0, enter.start, enter.end, 1]

  const output = exit ? [0, 0, 0.55, 0.55, 0, 0] : [0, 0, 0.55, 0.55]

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
  beatIndex,
  hasReturnBeat,
  totalBeats,
  scrollYProgress,
  isContainerInView,
}: {
  step: Extract<
    CrossfadeStep,
    { kind: "participant-photo" | "participant-video" }
  >
  beatIndex: number
  hasReturnBeat: boolean
  totalBeats: number
  scrollYProgress: MotionValue<number>
  isContainerInView: boolean
}) {
  const enter = getTransition(beatIndex - 1, totalBeats, 0.3)
  const exit = hasReturnBeat ? getTransition(beatIndex, totalBeats, 0.3) : null

  const input = exit
    ? [0, enter.start, enter.end, exit.start, exit.end, 1]
    : [0, enter.start, enter.end, 1]

  const opacityOutput = exit ? [0, 0, 1, 1, 0, 0] : [0, 0, 1, 1]
  const yOutput = exit
    ? ["100vh", "100vh", "0vh", "0vh", "-100vh", "-100vh"]
    : ["100vh", "100vh", "0vh", "0vh"]

  const opacity = useTransform(scrollYProgress, input, opacityOutput)
  const y = useTransform(scrollYProgress, input, yOutput)

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(false)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const active = exit
      ? latest >= enter.start && latest <= exit.end
      : latest >= enter.start
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
      className={`absolute inset-0 z-30 flex items-center justify-center px-4 ${
        isActive ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <div className="w-full flex flex-col items-center">
        <div className="bg-offwhite w-fit max-w-[82vw] sm:max-w-sm md:max-w-md shadow-2xl flex flex-col items-center">
          {step.kind === "participant-photo" ? (
            <Image
              src={step.src}
              alt={step.caption || "Participant perspective"}
              width={0}
              height={0}
              quality={90}
              draggable={false}
              style={{ width: "auto", height: "auto" }}
              className="max-w-[82vw] sm:max-w-sm md:max-w-md max-h-[48vh] md:max-h-[55vh] object-contain bg-offblack"
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
              className="w-auto h-auto max-w-[82vw] sm:max-w-sm md:max-w-md max-h-[48vh] md:max-h-[55vh] object-contain bg-offblack"
            />
          )}

          <div className="pt-3 pb-3.5 md:pt-5 md:pb-6 px-4 w-full">
            <p className="font-libre text-[11px] md:text-[14px] text-offblack text-center">
              {step.copyright}
            </p>
          </div>
        </div>

        {step.caption && (
          <p className="caption-text text-theme-white mt-3 md:mt-5 text-center max-w-xl text-xs sm:text-sm md:text-base leading-relaxed shadow-black drop-shadow-md">
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

  const { computed, totalBeats } = useMemo(() => buildTimeline(steps), [steps])

  const dynamicHeight = `${totalBeats * 180}vh`

  return (
    <div
      ref={containerRef}
      className="relative w-full my-16 md:my-20 bg-offblack select-none"
      style={{ height: dynamicHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-linear-to-b from-offblack via-theme-black to-offblack">
        <div className="relative z-10 w-full max-w-[177.78vh] aspect-video mx-auto">
          <div className="pointer-events-none absolute bottom-full inset-x-[-50vw] h-[50vh] bg-linear-to-b from-offblack via-neutral-900 to-theme-black z-0" />
          <div className="pointer-events-none absolute top-full inset-x-[-50vw] h-[50vh] bg-linear-to-t from-offblack via-neutral-900 to-theme-black z-0" />

          <Image
            src={steps[0].src}
            alt="Crossfade base layer"
            fill
            quality={90}
            draggable={false}
            className="object-contain z-0"
            sizes="100vw"
          />

          {computed.map(({ step, stepIndex, beatIndex }) => {
            if (stepIndex === 0 || step.kind !== "author") return null
            return (
              <AuthorImageLayer
                key={`${step.src}-${stepIndex}`}
                src={step.src}
                beatIndex={beatIndex}
                totalBeats={totalBeats}
                scrollYProgress={scrollYProgress}
              />
            )
          })}

          {computed.map(
            ({ step, stepIndex, beatIndex, nextAuthorBeatIndex }) => {
              if (step.kind !== "author" || !step.caption) return null
              return (
                <AuthorCaptionGradient
                  key={`grad-${stepIndex}`}
                  beatIndex={beatIndex}
                  nextAuthorBeatIndex={nextAuthorBeatIndex}
                  totalBeats={totalBeats}
                  scrollYProgress={scrollYProgress}
                />
              )
            },
          )}

          {showLabel && (
            <p className="md:hidden pointer-events-none absolute bottom-full inset-x-4 mb-2 text-center font-montserrat text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-theme-yellow z-30 drop-shadow-md">
              Interactive - scrollable
            </p>
          )}

          <div className="pointer-events-none absolute top-full inset-x-4 mt-2.5 text-center md:top-auto md:right-auto md:bottom-10 md:left-10 md:mt-0 md:text-left z-30 max-w-3xl">
            {showLabel && (
              <p className="hidden md:block font-montserrat text-xs md:text-sm font-semibold uppercase tracking-widest text-theme-yellow mb-1.5 drop-shadow-md">
                Interactive - scrollable
              </p>
            )}

            <div className="grid items-start">
              {computed.map(
                ({ step, stepIndex, beatIndex, nextAuthorBeatIndex }) => {
                  if (step.kind !== "author" || !step.caption) return null
                  return (
                    <AuthorCaptionLayer
                      key={`cap-${stepIndex}`}
                      text={step.caption}
                      beatIndex={beatIndex}
                      nextAuthorBeatIndex={nextAuthorBeatIndex}
                      totalBeats={totalBeats}
                      scrollYProgress={scrollYProgress}
                    />
                  )
                },
              )}
            </div>
          </div>
        </div>

        {computed.map(({ step, stepIndex, beatIndex, hasReturnBeat }) => {
          if (step.kind === "author") return null
          return (
            <OverlayDimLayer
              key={`dim-${stepIndex}`}
              beatIndex={beatIndex}
              hasReturnBeat={hasReturnBeat}
              totalBeats={totalBeats}
              scrollYProgress={scrollYProgress}
            />
          )
        })}

        {computed.map(({ step, stepIndex, beatIndex, hasReturnBeat }) => {
          if (step.kind === "author") return null
          return (
            <ParticipantCardLayer
              key={`overlay-${step.src}-${stepIndex}`}
              step={step}
              beatIndex={beatIndex}
              hasReturnBeat={hasReturnBeat}
              totalBeats={totalBeats}
              scrollYProgress={scrollYProgress}
              isContainerInView={isContainerInView}
            />
          )
        })}
      </div>
    </div>
  )
}
