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
    content:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. Suspendisse potenti. Nulla facilisi. Praesent eget condimentum nulla, vitae maximus libero.",
  },
  {
    type: "author-photo",
    id: "img-1",
    src: "/images/placeholder1.jpg",
    alt: "Placeholder landscape",
    caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    width: 1920,
    height: 1080,
  },
  {
    type: "participant-photo",
    id: "img-2",
    src: "/images/placeholder2.jpg",
    alt: "Placeholder portrait",
    copyright: "Participant Name",
    caption:
      '"Nulla facilisi. Praesent eget condimentum nulla, vitae maximus libero."',
    width: 1080,
    height: 1350,
  },
  {
    type: "scroll-crossfade",
    id: "crossfade-1",
    images: ["/images/placeholder3.jpg", "/images/placeholder4.jpg"],
    caption: "CAPTION. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
  },
  {
    type: "text-block",
    id: "body-text-1",
    content:
      "Aliquam erat volutpat. Nam nec eleifend ante, eget malesuada sem. Cras pellentesque sagittis felis, sed sodales ex convallis vel. Morbi sed ex eros.",
  },
  {
    type: "scroll-overlay",
    id: "overlay-1",
    authorImg: "/images/placeholder5.jpg",
    participantImg: "/images/placeholder6.jpg",
    participantCopyright: "Participant Name",
    participantCaption:
      '"Cras pellentesque sagittis felis, sed sodales ex convallis vel."',
    participantWidth: 1080,
    participantHeight: 1080,
  },
  {
    type: "text-block",
    id: "body-text-2",
    content:
      "Phasellus in accumsan dui. Ut fermentum vestibulum magna in vehicula. Sed scelerisque sapien non turpis varius, ut feugiat ante scelerisque.",
  },
  {
    type: "scroll-crossfade",
    id: "crossfade-2",
    images: [
      "/images/placeholder7.jpg",
      "/images/placeholder8.jpg",
      "/images/placeholder1.jpg",
      "/images/placeholder10.jpg",
    ],
    caption:
      "LONG SEQUENCE CAPTION. Aliquam erat volutpat nam nec eleifend ante eget malesuada.",
  },
  {
    type: "author-photo",
    id: "img-3",
    src: "/images/placeholder2.jpg",
    alt: "Placeholder secondary author image",
    caption: "Ut fermentum vestibulum magna in vehicula.",
    width: 1080,
    height: 1350,
  },
  {
    type: "text-block",
    id: "conclusion-text",
    content:
      "Curabitur non interdum magna. Nam sit amet velit quis sapien maximus facilisis vitae non odio. Donec at orci vel magna fringilla ultrices.",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-offblack selection:bg-theme-yellow selection:text-offblack">
      <Hero
        src="/images/placeholder9.jpg"
        title="TITLE"
        subtitle="Lorem ipsum dolor sit amet"
      />

      <LanguageToggle />

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
                caption={block.caption!}
              />
            )
          }

          if (block.type === "scroll-overlay") {
            return (
              <ScrollOverlay
                key={block.id}
                authorImg={block.authorImg!}
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

      {/* Footer */}
      <Footer />
    </main>
  )
}
