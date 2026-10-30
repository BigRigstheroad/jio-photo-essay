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

  return (
    <figure className="max-w-3xl mx-auto w-full flex flex-col items-center my-16 px-4">
      <div className={`relative w-full ${aspectClass}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {caption && (
        <figcaption className="caption-text text-theme-white mt-4 text-center max-w-3xl">
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
    <div className="max-w-3xl mx-auto w-full flex flex-col items-center my-20 px-4">
      <div className="bg-offwhite w-full shadow-2xl flex flex-col">
        <div className={`relative w-full ${aspectClass}`}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="pt-6 pb-10 px-4 w-full">
          <p className="font-libre text-[14px] text-offblack text-center">
            © {copyright}
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
