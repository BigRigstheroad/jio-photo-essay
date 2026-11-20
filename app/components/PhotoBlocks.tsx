import Image from "next/image"

interface AuthorPhotoProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: "4/3" | "16/9" | "3/2" | "3/4"
}

const aspectClasses = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
  "3/2": "aspect-[3/2]",
  "3/4": "aspect-[3/4]",
}

export function AuthorPhoto({
  src,
  alt,
  caption,
  aspectRatio = "4/3",
}: AuthorPhotoProps) {
  return (
    <figure className="w-full bg-offblack my-12 md:my-16 px-0 md:px-4 select-none">
      <div className="w-full max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-center">
        <div
          className={`relative w-full ${aspectClasses[aspectRatio]} bg-offblack`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            quality={90}
            draggable={false}
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 768px, 896px"
          />
        </div>
        {caption && (
          <figcaption className="caption-text text-theme-white mt-3 md:mt-4 px-4 md:px-0 text-center max-w-3xl text-xs sm:text-sm md:text-lg leading-relaxed">
            {caption}
          </figcaption>
        )}
      </div>
    </figure>
  )
}

interface ParticipantPhotoProps {
  src: string
  alt: string
  copyright: string
  caption?: string
  aspectRatio?: "3/2" | "3/4"
}

export function ParticipantPhoto({
  src,
  alt,
  copyright,
  caption,
  aspectRatio = "3/4",
}: ParticipantPhotoProps) {
  const aspectClass = aspectRatio === "3/4" ? "aspect-[3/4]" : "aspect-[3/2]"

  return (
    <div className="max-w-[85vw] sm:max-w-sm md:max-w-md mx-auto w-full flex flex-col items-center my-14 md:my-20 px-4 select-none">
      <div className="bg-offwhite w-full shadow-2xl flex flex-col">
        <div className={`relative w-full ${aspectClass}`}>
          <Image
            src={src}
            alt={alt}
            fill
            quality={90}
            draggable={false}
            className="object-cover"
            sizes="(max-width: 768px) 85vw, 448px"
          />
        </div>

        <div className="pt-3 pb-3.5 md:pt-6 md:pb-6 px-4 w-full">
          <p className="font-libre text-[11px] md:text-[14px] text-offblack text-center">
            {copyright}
          </p>
        </div>
      </div>

      {caption && (
        <p className="caption-text text-theme-white mt-3 md:mt-6 text-center max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  )
}
