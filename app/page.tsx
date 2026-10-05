import Hero from "@/app/components/Hero"
import LanguageToggle from "@/app/components/LanguageToggle"
import { AuthorPhoto, ParticipantPhoto } from "@/app/components/PhotoBlocks"
import ScrollCrossfade from "@/app/components/ScrollCrossfade"
import ScrollOverlay from "@/app/components/ScrollOverlay"
import Footer from "@/app/components/Footer"

const essayContent = [
  {
    type: "text-block",
    id: "intro-text",
    content: "Intro text",
  },
  {
    type: "author-photo",
    id: "img-1",
    src: "/images/placeholder-landscape.jpg",
    alt: "Alt text",
    caption: "Author caption",
    width: 1920,
    height: 1080,
  },
  {
    type: "participant-photo",
    id: "img-2",
    src: "/images/placeholder-landscape.jpg",
    alt: "Alt text",
    copyright: "Participant Name",
    caption: '"Participant caption."',
    width: 1080,
    height: 1350,
  },
  {
    type: "scroll-crossfade",
    id: "crossfade-1",
    images: [
      "/images/placeholder-landscape.jpg",
      "/images/placeholder-landscape-2.jpg",
    ],
  },
  {
    type: "text-block",
    id: "body-text-1",
    content: "Body text.",
  },
  {
    type: "scroll-overlay",
    id: "overlay-1",
    clientImg: "/images/placeholder-landscape.jpg",
    participantImg: "/images/placeholder-landscape.jpg",
    participantCopyright: "Participant Name",
    participantCaption: '"Participant caption."',
    participantWidth: 1080,
    participantHeight: 1080,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-offblack selection:bg-theme-yellow selection:text-offblack">
      <Hero
        src="/images/placeholder-landscape.jpg"
        title="Title"
        subtitle="Subtitle"
      />

      <LanguageToggle />

      {/* story mapping */}
      <article className="py-20">
        {essayContent.map((block) => {
          if (block.type === "text-block") {
            return (
              <div
                key={block.id}
                className="max-w-2xl mx-auto px-4 my-12"
              >
                <p className="body-text leading-relaxed text-theme-white">
                  {block.content}
                </p>
              </div>
            )
          }

          if (block.type === "author-photo") {
            return (
              <AuthorPhoto
                key={block.id}
                src={block.src!}
                alt={block.alt!}
                caption={block.caption!}
                width={block.width!}
                height={block.height!}
              />
            )
          }

          if (block.type === "participant-photo") {
            return (
              <ParticipantPhoto
                key={block.id}
                src={block.src!}
                alt={block.alt!}
                copyright={block.copyright!}
                caption={block.caption!}
                width={block.width!}
                height={block.height!}
              />
            )
          }

          if (block.type === "scroll-crossfade") {
            return (
              <ScrollCrossfade
                key={block.id}
                images={block.images!}
              />
            )
          }

          if (block.type === "scroll-overlay") {
            return (
              <ScrollOverlay
                key={block.id}
                clientImg={block.clientImg!}
                participantImg={block.participantImg!}
                participantCopyright={block.participantCopyright!}
                participantCaption={block.participantCaption!}
                participantWidth={block.participantWidth!}
                participantHeight={block.participantHeight!}
              />
            )
          }

          return null
        })}
      </article>

      {/* 4. Footer */}
      <Footer />
    </main>
  )
}
