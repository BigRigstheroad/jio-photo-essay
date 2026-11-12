import Image from "next/image"

interface AuthorPhotoProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: "3/2" | "3/4"
}

export function AuthorPhoto({
  src,
  alt,
  caption,
  aspectRatio = "3/2",
}: AuthorPhotoProps) {
  const aspectClass = aspectRatio === "3/4" ? "aspect-[3/4]" : "aspect-[3/2]"
  const maxWidthClass =
    aspectRatio === "3/4"
      ? "max-w-[85vw] sm:max-w-md md:max-w-lg lg:max-w-xl"
      : "max-w-[92vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl"

  return (
    <figure
      className={`${maxWidthClass} mx-auto w-full flex flex-col items-center my-16 px-4`}
    >
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 80vw, 1024px"
        />
      </div>
      {caption && (
        <figcaption className="caption-text text-theme-white mt-4 text-center max-w-3xl text-sm sm:text-base md:text-lg">
          {caption}
        </figcaption>
      )}
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
    <div className="max-w-[85vw] sm:max-w-sm md:max-w-md mx-auto w-full flex flex-col items-center my-20 px-4">
      <div className="bg-offwhite w-full shadow-2xl flex flex-col">
        <div className={`relative w-full ${aspectClass}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 85vw, 448px"
          />
        </div>

        <div className="pt-4 pb-5 md:pt-6 md:pb-6 px-4 w-full">
          <p className="font-libre text-xs md:text-[14px] text-offblack text-center">
            {/* © */} {copyright}
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
