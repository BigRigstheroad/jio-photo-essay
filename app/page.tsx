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
    content:
      "In the municipality of Manolo Fortich, Bukidnon, a farmer clears the land in preparation for their next planting. For the thousands of farmers in the upland province, agriculture is seen as a way of life. Some would call themselves “pobre” (which directly translates to “poor”), not as a grievance, but to take pride in the honest living the land offers. But in a sector dependent on the climate, the farmers of Manolo Fortich must live with the ongoing impacts of climate change. And a “very strong” El Niño climate pattern has placed this way of life in greater precarity.",
  },
  {
    type: "author-full-width",
    id: "media-2",
    src: "/images/2.jpg",
    caption: "", // IMAGE 2 - NO CAPTION
  },
  {
    type: "author-photo",
    id: "media-3",
    src: "/images/3.jpg",
    alt: "A Higaonon tribe farmer sows seeds",
    caption: "A Higaonon tribe farmer sows seeds into the ground.", // IMAGE 3
    aspectRatio: "3/2",
  },
  {
    type: "participant-photo",
    id: "media-4",
    src: "/images/4.jpg",
    alt: "Preparing seeds in a kahon",
    copyright: "",
    caption:
      '"This is our process before we plant. First, we prepare the seeds and plant them in a small place we call kahon (box) so it may grow into seedlings. We wait for them to grow. When they’re big enough, we take each seed one by one, and transfer them to another place for planting."', // IMAGE 4
    aspectRatio: "3/4",
  },
  {
    type: "author-full-width",
    id: "media-5",
    src: "/images/5.jpg",
    caption:
      "Toto Resane, a 42-year-old farmer from Lingion, Manolo Fortich, waits to cross the street with his cow to go home after its daily feeding.", // IMAGE 5
  },
  {
    type: "author-full-width",
    id: "media-6",
    src: "/images/6.jpg",
    caption:
      "Once home, with the cow in the family backyard, Toto gets to work on feeding his pigs.", // IMAGE 6
  },
  {
    type: "participant-photo",
    id: "media-7",
    src: "/images/7.jpg",
    alt: "Participant horizontal perspective",
    copyright: "",
    caption: "",
    aspectRatio: "3/2",
  },
  {
    type: "author-full-width",
    id: "media-8",
    src: "/images/8.jpg",
    caption:
      "Meanwhile, Flor Resane, Toto’s wife, sorts out the drying laundry in a clothesline just a few feet away from the pig’s den.", // IMAGE 8
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
    captions: [
      'After a day’s work, Toto gets to wind down with his daughter. Writing in her notebook, Toto\'s daughter carefully mouths the letters "A...B...C...".', // IMAGE 9
      "A young corn seedling emerges in the field. Seemingly unexpected as the field was planted with cassava, the seedling may have been from leftover kernels from a previous crop.", // IMAGE 10
      "While waiting for crops to grow, Toto helps his friend and fellow farmer, Ricky Cutin, build a homemade kalan de mantika (used oil stove). According to Ricky, rising LPG prices have made him seek this alternative.", // IMAGE 11
      "Upon sharing the success of their project, Ricky and Toto were approached by neighbours asking for their own kalan de mantika.", // IMAGE 12
      "", // IMAGE 13 - NO CAPTION
    ],
    showLabel: true,
  },
  {
    type: "participant-video",
    id: "media-14",
    src: "/videos/14.mp4",
    copyright: "",
    aspectRatio: "3/4",
  },
  {
    type: "scroll-overlay",
    id: "media-15-16",
    authorImg1: "/images/15.jpg",
    participantImg: "/images/16.jpg",
    participantCopyright: "",
    participantCaption: "",
    participantWidth: 1536,
    participantHeight: 2048,
  },
  {
    type: "author-full-width",
    id: "media-17",
    src: "/images/17.jpg",
    caption: "",
  },
  {
    type: "scroll-video-overlay",
    id: "media-18-19-20",
    authorImg1: "/images/18.jpg",
    participantVideoSrc: "/videos/19.mp4",
    authorImg2: "/images/20.jpg",
    participantCopyright: "",
    participantCaption: "",
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
    captions: ["", "", "", "", ""],
    showLabel: false,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-offblack selection:bg-theme-yellow selection:text-offblack">
      <Hero
        src="/images/1.jpg"
        title="MAKIGDUYOG SA YUTA"
        subtitle="The Lives of Bukidnon Farmers Amid Changing Climates"
      />

      <LanguageToggle />

      <article className="py-5">
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
                captions={block.captions!}
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
