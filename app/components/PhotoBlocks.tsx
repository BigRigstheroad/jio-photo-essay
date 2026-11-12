import Image from "next/image"

interface AuthorPhotoProps {
  src: string
  alt: string
  caption?: string
  aspectRatio?: "16/9" | "3/2" | "3/4"
}

export function AuthorPhoto({ src, alt, caption }: AuthorPhotoProps) {
  return (
    <figure className="max-w-[92vw] sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full flex flex-col items-center my-16 px-4">
      <div className="relative w-full aspect-video bg-theme-black">
        <Image
          src={src}
          alt={alt}
          fill
          quality={90}
          className="object-contain"
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
}: ParticipantPhotoProps) {
  return (
    <div className="w-full flex flex-col items-center my-20 px-4">
      <div className="bg-offwhite w-fit max-w-[88vw] sm:max-w-md md:max-w-xl shadow-2xl flex flex-col items-center">
        <Image
          src={src}
          alt={alt}
          width={2048}
          height={2048}
          quality={90}
          className="w-auto h-auto max-w-[88vw] sm:max-w-md md:max-w-xl max-h-[62vh] object-contain bg-black"
          sizes="(max-width: 768px) 88vw, 576px"
        />

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
