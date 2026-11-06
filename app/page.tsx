import Hero from "@/app/components/Hero"
import LanguageToggle from "@/app/components/LanguageToggle"
import AuthorFullWidth from "@/app/components/AuthorFullWidth"
import { AuthorPhoto, ParticipantPhoto } from "@/app/components/PhotoBlocks"
import ScrollCrossfade from "@/app/components/ScrollCrossfade"
import ScrollOverlay from "@/app/components/ScrollOverlay"
import ScrollVideoOverlay from "@/app/components/VideoScrollOverlay"
import { ParticipantVideo } from "@/app/components/ParticipantVideo"
import VideoBlock from "@/app/components/VideoBlocks"
import Footer from "@/app/components/Footer"

const essayContent = [
  {
    type: "text-block",
    id: "seq1-text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    type: "author-full-width",
    id: "seq1-full",
    src: "/images/placeholder1.jpg",
    caption: "[Full-Width Image Component]",
  },
  {
    type: "author-photo",
    id: "seq1-auth-horiz",
    src: "/images/placeholder2.jpg",
    alt: "Farming tools",
    caption: "[Horizontal Photo Component (3:2 Ratio)]",
    aspectRatio: "3/2",
  },
  {
    type: "author-photo",
    id: "seq1-auth-vert",
    src: "/images/placeholder3.jpg",
    alt: "A portrait in the field",
    caption: "[Vertical Photo Component (3:4 Ratio)]",
    aspectRatio: "3/4",
  },

  {
    type: "text-block",
    id: "seq2-text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    type: "participant-photo",
    id: "seq2-part-photo",
    src: "/images/placeholder4.jpg",
    alt: "Hands at work",
    copyright: "Participant One",
    caption: "[Participant Vertical Photo Component (3:4 Ratio)]",
    aspectRatio: "3/4",
  },
  {
    type: "participant-video",
    id: "seq2-part-vid",
    src: "/videos/placeholder-vertical.mp4",
    copyright: "Participant One",
    caption: "[Participant Vertical Video Component (3:4 Ratio)]",
    aspectRatio: "3/4",
  },

  {
    type: "text-block",
    id: "seq3-text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    type: "scroll-overlay",
    id: "seq3-overlay-photo",
    authorImg: "/images/placeholder5.jpg",
    participantImg: "/images/placeholder6.jpg",
    participantCopyright: "Participant Two",
    participantCaption: "[Interactive Scroll Photo Overlay Component]",
    participantWidth: 1080,
    participantHeight: 1440,
  },
  {
    type: "scroll-video-overlay",
    id: "seq3-overlay-video",
    authorImg: "/images/placeholder7.jpg",
    participantVideoSrc: "/videos/placeholder-vertical.mp4",
    participantCopyright: "Participant Three",
    participantCaption: "[Interactive Scroll Video Overlay Component]",
  },
  {
    type: "scroll-crossfade",
    id: "seq3-crossfade",
    images: [
      "/images/placeholder8.jpg",
      "/images/placeholder1.jpg",
      "/images/placeholder2.jpg",
    ],
    caption: "[Interactive 3-Image Scroll Crossfade Component]",
    showLabel: true,
  },

  {
    type: "text-block",
    id: "seq4-text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    type: "participant-photo",
    id: "seq4-part-horiz",
    src: "/images/placeholder3.jpg",
    alt: "The harvest",
    copyright: "Participant Four",
    caption: "[Participant Horizontal Photo Component (3:2 Ratio)]",
    aspectRatio: "3/2",
  },
  {
    type: "video-block",
    id: "seq4-vid-standard",
    src: "/videos/placeholder-horizontal.mp4",
    caption: "[Standard Horizontal Video Block Component]",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-offblack selection:bg-theme-yellow selection:text-offblack">
      <Hero
        src="/images/placeholder9.jpg"
        title="Title"
        subtitle="Caption caption caption subtitle somethign something"
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
                authorImg={block.authorImg!}
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
                authorImg={block.authorImg!}
                participantVideoSrc={block.participantVideoSrc!}
                participantCopyright={block.participantCopyright!}
                participantCaption={block.participantCaption!}
              />
            )
          }

          if (block.type === "video-block") {
            return (
              <VideoBlock
                key={block.id}
                src={block.src!}
                caption={block.caption!}
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
