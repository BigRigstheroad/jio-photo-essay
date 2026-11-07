import Hero from "@/app/components/Hero"
import LanguageToggle from "@/app/components/LanguageToggle"
import AuthorFullWidth from "@/app/components/AuthorFullWidth"
import { AuthorPhoto, ParticipantPhoto } from "@/app/components/PhotoBlocks"
import ScrollCrossfade from "@/app/components/ScrollCrossfade"
import ScrollOverlay from "@/app/components/ScrollOverlay"
import ScrollVideoOverlay from "@/app/components/ScrollVideoOverlay"
import { ParticipantVideo } from "@/app/components/ParticipantVideo"
import Footer from "@/app/components/Footer"

const essayContent = [
  {
    type: "text-block",
    id: "seq1-text",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "author-full-width",
    id: "media-2",
    src: "/images/2.jpg",
    caption: "[Author Full Width - 2.jpg]",
  },
  {
    type: "text-block",
    id: "seq1-text-2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "author-photo",
    id: "media-3",
    src: "/images/3.jpg",
    alt: "Author photo 3",
    caption: "[Author Standard Photo (3:2) - 3.jpg]",
    aspectRatio: "3/2",
  },
  {
    type: "participant-photo",
    id: "media-4",
    src: "/images/4.jpg",
    alt: "Participant photo 4",
    copyright: "Participant Name",
    caption: "[Participant Vertical Photo (3:4) - 4.jpg]",
    aspectRatio: "3/4",
  },
  {
    type: "text-block",
    id: "seq2-text",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "author-full-width",
    id: "media-5",
    src: "/images/5.jpg",
    caption: "[Author Full Width - 5.jpg]",
  },
  {
    type: "author-full-width",
    id: "media-6",
    src: "/images/6.jpg",
    caption: "[Author Full Width - 6.jpg]",
  },
  {
    type: "participant-photo",
    id: "media-7",
    src: "/images/7.jpg",
    alt: "Participant photo 7",
    copyright: "Participant Name",
    caption: "[Participant Horizontal Photo (3:2) - 7.jpg]",
    aspectRatio: "3/2",
  },
  {
    type: "text-block",
    id: "seq3-text",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "author-full-width",
    id: "media-8",
    src: "/images/8.jpg",
    caption: "[Author Full Width - 8.jpg]",
  },
  {
    type: "scroll-crossfade",
    id: "media-9-to-13",
    images: [
      "/images/9.jpg",
      "/images/10.jpg",
      "/images/11.jpg",
      "/images/12.jpg",
      "/images/13.jpg",
    ],
    caption: "[5-Image Crossfade Sequence - 9.jpg through 13.jpg]",
    showLabel: true,
  },
  {
    type: "text-block",
    id: "seq4-text",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "participant-video",
    id: "media-14",
    src: "/videos/14.mp4",
    copyright: "Participant Name",
    caption: "[Participant Vertical Video (3:4) - 14.mp4]",
    aspectRatio: "3/4",
  },
  {
    type: "scroll-overlay",
    id: "media-15-16",
    authorImg1: "/images/15.jpg",
    participantImg: "/images/16.jpg",
    participantCopyright: "Participant Name",
    participantCaption:
      "[Interactive Photo Overlay (Locked Background) - 15.jpg > 16.jpg > 15.jpg]",
    participantWidth: 1536,
    participantHeight: 2048,
  },
  {
    type: "author-full-width",
    id: "media-17",
    src: "/images/17.jpg",
    caption: "[Author Full Width - 17.jpg]",
  },
  {
    type: "text-block",
    id: "seq5-text",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "scroll-video-overlay",
    id: "media-18-19-20",
    authorImg1: "/images/18.jpg",
    participantVideoSrc: "/videos/19.mp4",
    authorImg2: "/images/20.jpg",
    participantCopyright: "Participant Name",
    participantCaption:
      "[Interactive Video Overlay (Crossfade Background) - 18.jpg > 19.mp4 > 20.jpg]",
  },
  {
    type: "text-block",
    id: "seq6-text",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    type: "scroll-crossfade",
    id: "media-21-to-25",
    images: [
      "/images/21.jpg",
      "/images/22.jpg",
      "/images/23.jpg",
      "/images/24.jpg",
      "/images/25.jpg",
    ],
    caption: "[Final 5-Image Crossfade Sequence - 21.jpg through 25.jpg]",
    showLabel: false,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-offblack selection:bg-theme-yellow selection:text-offblack">
      <Hero
        src="/images/1.jpg"
        title="TITLE"
        subtitle="Visual-Led Sequence Test"
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
                <p className="body-text leading-relaxed text-theme-white text-lg">
                  {block.content}
                </p>
              </div>
            )
          }

          if (block.type === "author-full-width") {
            return (
              <AuthorFullWidth
                key={block.id}
                src={block.src!}
                caption={block.caption!}
              />
            )
          }

          if (block.type === "author-photo") {
            return (
              <AuthorPhoto
                key={block.id}
                src={block.src!}
                alt={block.alt!}
                caption={block.caption!}
                aspectRatio={block.aspectRatio as "3/2" | "3/4"}
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
                aspectRatio={block.aspectRatio as "3/2" | "3/4"}
              />
            )
          }

          if (block.type === "participant-video") {
            return (
              <ParticipantVideo
                key={block.id}
                src={block.src!}
                copyright={block.copyright!}
                caption={block.caption!}
                aspectRatio={block.aspectRatio as "3/2" | "3/4"}
              />
            )
          }

          if (block.type === "scroll-crossfade") {
            return (
              <ScrollCrossfade
                key={block.id}
                images={block.images!}
                caption={block.caption!}
                showLabel={block.showLabel}
              />
            )
          }

          if (block.type === "scroll-overlay") {
            return (
              <ScrollOverlay
                key={block.id}
                authorImg1={block.authorImg1!}
                authorImg2={block.authorImg2}
                participantImg={block.participantImg!}
                participantCopyright={block.participantCopyright!}
                participantCaption={block.participantCaption!}
                participantWidth={block.participantWidth!}
                participantHeight={block.participantHeight!}
              />
            )
          }

          if (block.type === "scroll-video-overlay") {
            return (
              <ScrollVideoOverlay
                key={block.id}
                authorImg1={block.authorImg1!}
                authorImg2={block.authorImg2}
                participantVideoSrc={block.participantVideoSrc!}
                participantCopyright={block.participantCopyright!}
                participantCaption={block.participantCaption!}
              />
            )
          }

          return null
        })}
      </article>

      <Footer />
    </main>
  )
}
