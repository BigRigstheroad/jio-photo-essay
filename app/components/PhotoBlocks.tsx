import Image from "next/image"

interface AuthorPhotoProps {
  src: string
  alt: string
  caption?: string
  width: number
  height: number
}

export function AuthorPhoto({
  src,
  alt,
  caption,
  width,
  height,
}: AuthorPhotoProps) {
  return (
    <figure className="max-w-5xl mx-auto w-full flex flex-col items-center my-16 px-4">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover max-h-[80vh]"
        sizes="(max-width: 1024px) 100vw, 1024px"
      />
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
  width: number
  height: number
}

export function ParticipantPhoto({
  src,
  alt,
  copyright,
  caption,
  width,
  height,
}: ParticipantPhotoProps) {
  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col items-center my-20 px-4">
      {/* offwhite frame */}
      <div className="bg-offwhite p-4 pb-10 w-full shadow-2xl">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto object-cover max-h-[75vh]"
          sizes="(max-width: 768px) 100vw, 768px"
        />
        <p className="font-libre text-[14px] text-offblack text-center mt-6">
          © {copyright}
        </p>
      </div>
      {/* caption */}
      {caption && (
        <p className="caption-text text-theme-white mt-6 text-center max-w-2xl">
          {caption}
        </p>
      )}
    </div>
  )
}
