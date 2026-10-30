export default function VideoBlocks({
  src,
  caption,
}: {
  src: string
  caption?: string
}) {
  return (
    <figure className="max-w-3xl mx-auto w-full flex flex-col items-center my-16 px-4">
      <video
        src={src}
        controls
        preload="metadata"
        playsInline
        className="w-full aspect-video bg-black shadow-lg"
      />
      {caption && (
        <figcaption className="caption-text text-theme-white mt-4 text-center max-w-3xl">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
