import Hero from "@/app/components/Hero"
import LanguageToggle from "@/app/components/LanguageToggle"
import AuthorFullWidth from "@/app/components/AuthorFullWidth"
import { AuthorPhoto, ParticipantPhoto } from "@/app/components/PhotoBlocks"
import ScrollCrossfade, {
  CrossfadeStep,
} from "@/app/components/ScrollCrossfade"
import { ParticipantVideo } from "@/app/components/ParticipantVideo"
import Footer from "@/app/components/Footer"

type EssayBlock =
  | {
      type: "text-block"
      id: string
      paragraphs: string[]
    }
  | {
      type: "author-full-width"
      id: string
      src: string
      caption: string
    }
  | {
      type: "author-photo"
      id: string
      src: string
      alt: string
      caption?: string
      aspectRatio?: "4/3" | "16/9" | "3/2" | "3/4"
    }
  | {
      type: "participant-photo"
      id: string
      src: string
      alt: string
      copyright: string
      caption?: string
    }
  | {
      type: "participant-video"
      id: string
      src: string
      copyright: string
      caption?: string
    }
  | {
      type: "scroll-crossfade"
      id: string
      steps: CrossfadeStep[]
      showLabel?: boolean
    }

const essayContent: EssayBlock[] = [
  // INTRO PARAGRAPH
  {
    type: "text-block",
    id: "intro-text",
    paragraphs: [
      "For the thousands of farmers in the upland province of Manolo Fortich, Bukidnon, agriculture is a way of life. Some would call themselves “pobre” (which directly translates to “poor”), not as a grievance, but to take pride in the honest living the land offers. But in a sector dependent on the climate, the farmers of Manolo Fortich must live with the ongoing impacts of climate change. And a “very strong” El Niño climate pattern has placed this way of life in greater precarity.",
      "In April 2026, the Philippine Atmospheric Geophysical and Astronomical Services Administration (PAGASA) issued an El Niño Alert, warning that “an increased possibility of drier-than-usual conditions” would emerge in the midyear. And in September, PAGASA declared that the phenomenon is expected to develop into a “very strong”, or as some would even call it, “Super” El Niño in the last months of 2026, persisting into the first half of 2027.",
    ],
  },

  // IMAGE 2 (16:9 FULL-WIDTH) & IMAGE 3 (4:3 AUTHOR PHOTO - NO CAPTION)
  {
    type: "author-full-width",
    id: "media-2",
    src: "/images/2.jpg",
    caption: "",
  },
  {
    type: "author-photo",
    id: "media-3",
    src: "/images/3.jpg",
    alt: "Author photo 3",
    caption: "",
    aspectRatio: "4/3",
  },

  // TEXT BLOCK
  {
    type: "text-block",
    id: "memory-text",
    paragraphs: [
      "Farmers from Manolo Fortich have the tendency to document their own experiences as well, helping develop their community’s collective memory.",
    ],
  },

  // IMAGE 4 - PARTICIPANT SINGLE IMAGE
  // Original text: Ito ang proseso namin bago magtanim. Una inihahanda muna ang mga buto at itinatanim ang mga ito sa isang maliit na lugar na tinatawag naming kahon upang tumubo ang mga punla. Hinihintay muna namin na lumaki at kapag sapat na ang laki at handa ng ilipat isa-isa naming binubunot at saka inililipat at itinatanim.
  {
    type: "participant-photo",
    id: "media-4",
    src: "/images/4.jpg",
    alt: "Seedlings prepared in a kahon",
    copyright: "© Anonymous 2025 | ‘Makigduyog sa Yuta’",
    caption:
      "“This is our process before we plant. First, we prepare the seeds and plant them in a small place we call kahon (box) so it may grow into seedlings. We wait for them to grow. When they’re big enough, we take each seed one by one, and transfer them to another place for planting.” - Narlyn Sumuhoy",
  },

  // INTERACTIVE CROSSFADING SEQUENCE 1 (1A - 1E: Images 5, 6, 7 [overlay], 8, 9)
  {
    type: "scroll-crossfade",
    id: "media-5-to-9",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/5.jpg",
        caption:
          "Toto Resane, a 42-year-old farmer from Manolo Fortich, Bukidnon, waits to cross the street after feeding his cow for the day.",
      },
      {
        kind: "author",
        src: "/images/6.jpg",
        caption:
          "Once home, with the cow in the family backyard, Resane feeds his pigs.",
      },
      {
        kind: "participant-photo",
        src: "/images/7.jpg",
        copyright: "© Flor 2026 | ‘Makigduyog sa Yuta’",
        caption: "[No Caption]",
      },
      {
        kind: "author",
        src: "/images/8.jpg",
        caption:
          "Meanwhile, Flor, Resane’s wife, sorts out the drying laundry on a clothesline.",
      },
      {
        kind: "author",
        src: "/images/9.jpg",
        caption:
          'After a day’s work, Resane winds down with his daughter. Writing in her notebook, Resane’s daughter carefully mouths the letters "A...B...C...".',
      },
    ],
  },

  // IMAGE 10 - SINGLE IMAGE
  {
    type: "author-full-width",
    id: "media-10",
    src: "/images/10.jpg",
    caption: "A leftover corn seedling emerges from soil planted with cassava.",
  },

  // BODY PARAGRAPH 1
  {
    type: "text-block",
    id: "body-text-1",
    paragraphs: [
      "Corn is a staple crop for the farmers of Manolo Fortich. Conditions for planting corn are typically most favorable during April to May, the start of the wet season. But as dry conditions are expected around their second cropping, around September to December, many farmers are opting to cultivate drought-tolerant crops such as cassava and ube instead. The tradeoff is that cassava and ube take twice as long as corn to cultivate.",
    ],
  },

  // INTERACTIVE CROSSFADING SEQUENCE 2 (2A - 2D: Images 11, 12, 13, 14 [video overlay, stays])
  // Original text (14): “Yung kanin, mga sampung minuto lang luto na. Matagal ko na rin ‘to balak gawin kasi ang mahal na ng gasul. Nagawa rin. Magkano lang yung used oil sa mga talyer.”
  {
    type: "scroll-crossfade",
    id: "media-11-to-14",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/11.jpg",
        caption:
          "While waiting for crops to grow, Resane helps his friend and fellow farmer, Rickys Cutin, build a homemade used oil stove with materials sourced from a scrap yard. According to Cutin, rising LPG prices have made him seek this alternative.",
      },
      {
        kind: "author",
        src: "/images/12.jpg",
        caption:
          "Upon sharing the success of their project, Cutin and Resane were approached by neighbors requesting the production of their own used oil stoves.",
      },
      {
        kind: "author",
        src: "/images/13.jpg",
        caption: "",
      },
      {
        kind: "participant-video",
        src: "/videos/14.mp4",
        copyright: "© Rickys Cutin 2026 | ‘Makigduyog sa Yuta’",
        caption:
          "“It only takes ten minutes to fully cook rice on this stove. I’ve been planning to make this [stove] for a while, because LPG tanks are expensive these days. Buying used oil from an auto shop is much cheaper.”",
      },
    ],
  },

  // INTERACTIVE CROSSFADING SEQUENCE 3 (3A - 3B: Image 15 -> 16 [photo overlay, stays])
  // Original text (16): “Yellow corn, kunting kain mulang, sulit kana sa busog”
  {
    type: "scroll-crossfade",
    id: "media-15-to-16",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/15.jpg",
        caption:
          "Meanwhile, dinner is served in the household of Linda Lumintad, a 65-year-old farmer.",
      },
      {
        kind: "participant-photo",
        src: "/images/16.jpg",
        copyright: "© Ren 2026 | ‘Makigduyog sa Yuta’",
        caption: "“Yellow corn. Even a small serving is already filling.”",
      },
    ],
  },

  // BODY PARAGRAPH 2
  {
    type: "text-block",
    id: "body-text-2",
    paragraphs: [
      "The seeds planted months ago have matured into crops ready for harvest.",
      "Farmhands are hired, often family friends or family themselves. Harvesters and trucks are brought in as well to expedite the process, though not all farmers have access to these machinery. Some continue to hand harvest out of necessity.",
      "As they step on the field once more, farmers must work with weather conditions that have only become more unpredictable.",
      "“A lot has been changing over the years. [The weather patterns] are not as pronounced as before. It’s erratic. It rains during the summer season; it gets dry during the wet season, even during August (typically in the middle of the wet season), there was one week with no rain at all.” Municipal agriculturist of Manolo Fortich, Gemma Cania, observes.",
      "These changing weather patterns have affected how farmers plan. According to Manolo Fortich councilor and farmer Elzevir Dagunlay, “Climate change thwarts the predictions of farmers. It’s so different nowadays, unlike ten or twenty years ago, you could predict the season and prepare your land. Now, our rainfall pattern here in Bukidnon is not the same.”",
    ],
  },

  // IMAGE 17 - SINGLE IMAGE
  {
    type: "author-full-width",
    id: "media-17",
    src: "/images/17.jpg",
    caption:
      "Dagunlay also notes that despite Manolo Fortich being an upland municipality, the heat can still get extreme.",
  },

  // IMAGE 18 & 19 - OVERLAY IMAGE 18 WITH PARTICIPANT VIDEO 19
  {
    type: "scroll-crossfade",
    id: "media-18-to-19",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/18.jpg",
        caption: "",
      },
      {
        kind: "participant-video",
        src: "/videos/19.mp4",
        copyright: "© Flor 2026 | ‘Makigduyog sa Yuta’",
        caption: "Corn harvesting.",
      },
    ],
  },

  // IMAGES 20, 21, 22 - SINGLE IMAGES
  {
    type: "author-full-width",
    id: "media-20",
    src: "/images/20.jpg",
    caption:
      "Even during the dry season, sudden downpour can interrupt harvest days.",
  },
  {
    type: "author-full-width",
    id: "media-21",
    src: "/images/21.jpg",
    caption:
      "Lumintad works with her son, Ren, around 6 in the evening. She says that it gets really hot when working during the midday, so working at night or early morning, around 4:00AM, lets them avoid the heat. Additionally, working at night or early morning is what her schedule often permits.",
  },
  {
    type: "author-full-width",
    id: "media-22",
    src: "/images/22.jpg",
    caption: "A portrait of Linda Lumintad in Lingion, Manolo Fortich.",
  },

  // BODY PARAGRAPH 3
  {
    type: "text-block",
    id: "body-text-3",
    paragraphs: [
      "Lumintad likens planting to making a shot; “sometimes you miss, other times you score.”",
      "Current climate conditions, along with El Niño, worsens the odds of farmers.",
      "According to Cania, the Municipal Agriculture Office (MAO) of Manolo Fortich have already received many reports of crop damage during the current El Niño cycle. “Those who planted earlier, around May, were safe because their crops could reach maturity, especially corn. But it’s difficult already for those who planted later on, from July to August. Those crops were really damaged.”",
      "For a community deeply rooted in agriculture, crop damage as a result of climate events like El Niño considerably impacts their livelihood and food security.",
      "Lenerio Sumuhoy, a farmer, forest guard, and member of the Higaonon, was still a child when he was working for the family farm. He shared that his family could ask neighbours to have some of their produce with no charge. But the rising cost of living over the years dictated the end of this practice. Now, they must buy the produce from their neighbours.",
      "Sumuhoy, now 61, went to his bodega, a weathered bamboo hut that had served as his previous home, and took some ears of corn. It had been stunted as a result of both overheating and oversoaking. He also mentioned that the lack of fertilizer did not help.",
      "Sumuhoy says that despite the challenges, he continues to maintain the farming tradition, as his wish is to let his 10 children, one of which is on the brink of finishing their studies, inherit a fertile land.",
    ],
  },

  // INTERACTIVE CROSSFADE (Images 23, 24, 25 - NO CAPTION)
  {
    type: "scroll-crossfade",
    id: "media-23-to-25",
    showLabel: true,
    steps: [
      { kind: "author", src: "/images/23.jpg", caption: "" },
      { kind: "author", src: "/images/24.jpg", caption: "" },
      { kind: "author", src: "/images/25.jpg", caption: "" },
    ],
  },

  // IMAGE 26 - SINGLE IMAGE (NO CAPTION)
  {
    type: "author-full-width",
    id: "media-26",
    src: "/images/26.jpg",
    caption: "",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-offblack select-none">
      <Hero
        src="/images/1.jpg"
        title="MAKIGDUYOG SA YUTA (Together With the Land)"
        subtitle="The Lives of Bukidnon Farmers Amid Changing Climates"
      />

      <LanguageToggle />

      <article className="py-20">
        {essayContent.map((block) => {
          if (block.type === "text-block") {
            return (
              <div
                key={block.id}
                className="max-w-2xl mx-auto px-5 my-10 md:my-16 space-y-4 md:space-y-6"
              >
                {block.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className="body-text leading-relaxed text-theme-white text-sm sm:text-base md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )
          }

          if (block.type === "author-full-width") {
            return (
              <AuthorFullWidth
                key={block.id}
                src={block.src}
                caption={block.caption}
              />
            )
          }

          if (block.type === "author-photo") {
            return (
              <AuthorPhoto
                key={block.id}
                src={block.src}
                alt={block.alt}
                caption={block.caption}
                aspectRatio={block.aspectRatio}
              />
            )
          }

          if (block.type === "participant-photo") {
            return (
              <ParticipantPhoto
                key={block.id}
                src={block.src}
                alt={block.alt}
                copyright={block.copyright}
                caption={block.caption}
              />
            )
          }

          if (block.type === "participant-video") {
            return (
              <ParticipantVideo
                key={block.id}
                src={block.src}
                copyright={block.copyright}
                caption={block.caption}
              />
            )
          }

          if (block.type === "scroll-crossfade") {
            return (
              <ScrollCrossfade
                key={block.id}
                steps={block.steps}
                showLabel={block.showLabel}
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
