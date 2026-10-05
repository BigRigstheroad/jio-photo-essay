// jio's images
export function ClientImage({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure className="max-w-5xl mx-auto w-full flex flex-col items-center my-16 px-4">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover max-h-[80vh]"
      />
      {caption && (
        <figcaption className="caption-text text-theme-white mt-4 text-center max-w-3xl">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

// participant images
export function ParticipantImage({
  src,
  alt,
  copyright,
  caption,
}: {
  src: string
  alt: string
  copyright: string
  caption: string
}) {
  return (
    <div className="max-w-3xl mx-auto w-full flex flex-col items-center my-20 px-4">
      {/* The Offwhite Frame */}
      <div className="bg-offwhite p-4 pb-10 w-full shadow-2xl">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-cover max-h-[75vh]"
        />
        <p className="font-libre text-[14px] text-offblack text-center mt-6">
          © {copyright}
        </p>
      </div>
      {/* The Caption outside the frame */}
      {caption && (
        <p className="caption-text text-theme-white mt-6 text-center max-w-2xl">
          {caption}
        </p>
      )}
    </div>
  )
}
