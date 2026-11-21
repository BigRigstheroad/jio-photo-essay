"use client"
import { useState, useMemo } from "react"
import Hero from "@/app/components/Hero"
import LanguageToggle, { Language } from "@/app/components/LanguageToggle"
import AuthorFullWidth from "@/app/components/AuthorFullWidth"
import { AuthorPhoto, ParticipantPhoto } from "@/app/components/PhotoBlocks"
import ScrollCrossfade, {
  CrossfadeStep,
} from "@/app/components/ScrollCrossfade"
import { ParticipantVideo } from "@/app/components/ParticipantVideo"
import Footer from "@/app/components/Footer"

type LocalizedString = Record<Language, string>
type LocalizedParagraphs = Record<Language, string[]>

type LocalizedCrossfadeStep =
  | {
      kind: "author"
      src: string
      caption?: LocalizedString
    }
  | {
      kind: "participant-photo"
      src: string
      copyright: string
      caption?: LocalizedString
    }
  | {
      kind: "participant-video"
      src: string
      copyright: string
      caption?: LocalizedString
    }

type EssayBlock =
  | {
      type: "text-block"
      id: string
      paragraphs: LocalizedParagraphs
    }
  | {
      type: "author-full-width"
      id: string
      src: string
      caption: LocalizedString
    }
  | {
      type: "author-photo"
      id: string
      src: string
      alt: string
      caption?: LocalizedString
      aspectRatio?: "4/3" | "16/9" | "3/2" | "3/4"
    }
  | {
      type: "participant-photo"
      id: string
      src: string
      alt: string
      copyright: string
      caption?: LocalizedString
    }
  | {
      type: "participant-video"
      id: string
      src: string
      copyright: string
      caption?: LocalizedString
    }
  | {
      type: "scroll-crossfade"
      id: string
      steps: LocalizedCrossfadeStep[]
      showLabel?: boolean
    }

const heroSubtitle: LocalizedString = {
  EN: "The Lives of Bukidnon Farmers Amid Changing Climates",
  CEB: "Ang Kinabuhi sa mga Mag-uuma sa Bukidnon Taliwala sa Nag-usab-usab nga Klima",
}

const essayContent: EssayBlock[] = [
  // intro text
  {
    type: "text-block",
    id: "intro-text",
    paragraphs: {
      EN: [
        "For the thousands of farmers in the upland province of Manolo Fortich, Bukidnon, agriculture is a way of life. Some would call themselves “pobre” (which directly translates to “poor”), not as a grievance, but to take pride in the honest living the land offers. But in a sector dependent on the climate, the farmers of Manolo Fortich must live with the ongoing impacts of climate change. And a “very strong” El Niño climate pattern has placed this way of life in greater precarity.",
        "In April 2026, the Philippine Atmospheric Geophysical and Astronomical Services Administration (PAGASA) issued an El Niño Alert, warning that “an increased possibility of drier-than-usual conditions” would emerge in the midyear. And in September, PAGASA declared that the phenomenon is expected to develop into a “very strong”, or as some would even call it, “Super” El Niño in the last months of 2026.",
      ],
      CEB: [
        'Alang sa liboan ka mga mag-uuma sa kabukiran sa Manolo Fortich, Bukidnon, ang agrikultura usa ka paagi sa kinabuhi. Ang uban mutawag sa ilang kaugalingon nga "pobre", dili isip usa ka reklamo, apan aron mapasigarbuhon sa matinud-anon nga pagpuyo nga gitanyag sa yuta. Apan sa usa ka sektor nga nagsalig sa klima, ang mga mag-uuma sa Manolo Fortich kinahanglan nga magkinabuhi uban ang nagpadayon nga mga epekto sa pagbag-o sa klima. Ug ang hilabihan kakusog nga sumbanan sa klima sa El Niño nagbutang niini nga paagi sa kinabuhi sa mas delikado nga kahimtang.',
        'Niadtong Abril 2026, ang Philippine Atmospheric Geophysical and Astronomical Services Administration (PAGASA) nagpagawas og El Niño Alert, nga nagpasidaan nga "mas dako ang posibilidad sa mas uga nga mga kondisyon kaysa naandan" nga mutunga sa tunga-tunga sa tuig. Ug niadtong Septyembre, gideklarar sa PAGASA nga ang panghitabo gilauman nga molambo ngadto sa usa ka "kusog kaayo", o sama sa pagtawag sa uban niini, "Super" El Niño sa katapusang mga bulan sa 2026, nga magpadayon hangtod sa unang katunga sa 2027.',
      ],
    },
  },

  // img 2
  {
    type: "author-full-width",
    id: "media-2",
    src: "/images/2.jpg",
    caption: { EN: "", CEB: "" },
  },

  // img 3
  {
    type: "author-photo",
    id: "media-3",
    src: "/images/3.jpg",
    alt: "",
    caption: { EN: "", CEB: "" },
    aspectRatio: "4/3",
  },

  // text block
  {
    type: "text-block",
    id: "memory-text",
    paragraphs: {
      EN: [
        "Farmers from Manolo Fortich have the tendency to document their own experiences as well, helping develop their community’s collective memory.",
      ],
      CEB: [
        "Ang mga mag-uuma gikan sa Manolo Fortich adunay tendensiya nga idokumento ang ilang kaugalingong mga kasinatian, nga makatabang sa pagpalambo sa kolektibong panumduman sa ilang komunidad.",
      ],
    },
  },

  // img 4
  {
    type: "participant-photo",
    id: "media-4",
    src: "/images/4.jpg",
    alt: "",
    copyright: "© Anonymous 2025 | ‘Makigduyog sa Yuta’",
    caption: {
      EN: "“This is our process before we plant. First, we prepare the seeds and plant them in a small place we call kahon (box) so it may grow into seedlings. We wait for them to grow. When they’re big enough, we take each seed one by one, and transfer them to another place for planting.” - Narlyn Sumuhoy",
      CEB: "“Mao kini ang among proseso sa dili pa kami magtanom. Una, among andamon ang mga liso ug itanom kini sa usa ka gamay nga lugar nga among gitawag og kahon (kahon) aron kini motubo nga mga semilya. Among hulaton nga motubo kini. Kung igo na ang ilang gidak-on, among kuhaon ang matag liso usa-usa, ug ibalhin kini sa laing lugar para itanom.” - Narlyn Sumuhoy",
    },
  },

  // crossfade sequence: img 5, 6, 7, 8, 9
  {
    type: "scroll-crossfade",
    id: "media-5-to-9",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/5.jpg",
        caption: {
          EN: "Toto Resane, a 42-year-old farmer from Manolo Fortich, Bukidnon, waits to cross the street after feeding his cow for the day.",
          CEB: "Si Toto Resane, usa ka 42 anyos nga mag-uuma gikan sa Manolo Fortich, Bukidnon, naghulat aron motabok sa dalan human niya gipakaon ang iyang baka sa maong adlaw.",
        },
      },
      {
        kind: "author",
        src: "/images/6.jpg",
        caption: {
          EN: "Once home, with the cow in the family backyard, Resane feeds his pigs.",
          CEB: "Pag-uli sa balay, uban sa baka sa nataran sa pamilya, gipakaon ni Resane ang iyang mga baboy.",
        },
      },
      {
        kind: "participant-photo",
        src: "/images/7.jpg",
        copyright: "© Flor 2026 | ‘Makigduyog sa Yuta’",
        caption: {
          EN: "[No Caption]",
          CEB: "[No Caption]",
        },
      },
      {
        kind: "author",
        src: "/images/8.jpg",
        caption: {
          EN: "Meanwhile, Flor, Resane’s wife, sorts out the drying laundry on a clothesline.",
          CEB: "Samtang, si Flor, asawa ni Resane, nag-ayos sa mga labhan nga gipauga sa sampayan.",
        },
      },
      {
        kind: "author",
        src: "/images/9.jpg",
        caption: {
          EN: 'After a day’s work, Resane winds down with his daughter. Writing in her notebook, Resane’s daughter carefully mouths the letters "A...B...C...".',
          CEB: 'Human sa usa ka adlaw nga trabaho, si Resane mipahulay uban sa iyang anak nga babaye. Nagsulat sa iyang notebook, ang anak nga babaye ni Resane maampingong nagbasa sa mga letra nga "A...B...C...".',
        },
      },
    ],
  },

  // img 10
  {
    type: "author-full-width",
    id: "media-10",
    src: "/images/10.jpg",
    caption: {
      EN: "A leftover corn seedling emerges from soil planted with cassava.",
      CEB: "Usa ka nahibiling semilya sa mais ang mitumaw gikan sa yuta nga gitamnan og kamoteng kahoy.",
    },
  },

  // text block: body paragraph 1
  {
    type: "text-block",
    id: "body-text-1",
    paragraphs: {
      EN: [
        "Corn is a staple crop for the farmers of Manolo Fortich. Conditions for planting corn are typically most favorable during April to May, the start of the wet season. But as dry conditions are expected around their second cropping, around September to December, many farmers are opting to cultivate drought-tolerant crops such as cassava and ube instead. The tradeoff is that cassava and ube take twice as long as corn to cultivate.",
      ],
      CEB: [
        "Ang mais usa ka pangunang tanom para sa mga mag-uuma sa Manolo Fortich. Ang mga kondisyon sa pagtanom og mais kasagaran labing paborable sa Abril hangtod Mayo, ang pagsugod sa ting-ulan. Apan tungod kay gilauman ang uga nga panahon sa ilang ikaduhang pag-ani, sa mga Septyembre hangtod Disyembre, daghang mga mag-uuma ang mipili sa pagtanom og mga tanom nga makasugakod sa hulaw sama sa cassava ug ube. Ang bentaha niini mao nga ang cassava ug ube mukabat og doble nga gidugayon sa pagtanom kay sa mais.",
      ],
    },
  },

  // crossfade sequence: img 11, 12, 13, 14
  {
    type: "scroll-crossfade",
    id: "media-11-to-14",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/11.jpg",
        caption: {
          EN: "While waiting for crops to grow, Resane helps his friend and fellow farmer, Rickys Cutin, build a homemade used oil stove with materials sourced from a scrap yard. According to Cutin, rising LPG prices have made him seek this alternative.",
          CEB: "Samtang naghulat nga motubo ang mga tanom, gitabangan ni Resane ang iyang higala ug kaubang mag-uuma, si Rickys Cutin, paghimo og hinimo sa balay nga segunda-manong kalan gamit ang mga materyales nga gikan sa usa ka scrap yard. Sumala ni Cutin, ang pagsaka sa presyo sa LPG nakapahimo niya nga mangita niini nga alternatibo.",
        },
      },
      {
        kind: "author",
        src: "/images/12.jpg",
        caption: {
          EN: "Upon sharing the success of their project, Cutin and Resane were approached by neighbors requesting the production of their own used oil stoves.",
          CEB: "Sa pagpaambit sa kalampusan sa ilang proyekto, si Cutin ug Resane giduol sa mga silingan aron mangayo og kaugalingong mga kalan nga hinimo sa segunda-manong lana.",
        },
      },
      {
        kind: "author",
        src: "/images/13.jpg",
        caption: { EN: "", CEB: "" },
      },
      {
        kind: "participant-video",
        src: "/videos/14.mp4",
        copyright: "© Rickys Cutin 2026 | ‘Makigduyog sa Yuta’",
        caption: {
          EN: "“It only takes ten minutes to fully cook rice on this stove. I’ve been planning to make this [stove] for a while, because LPG tanks are expensive these days. Buying used oil from an auto shop is much cheaper.”",
          CEB: "“Napulo ra ka minuto ang gikinahanglan aron maluto og maayo ang bugas niining kalan. Dugay na kong nagplano nga himoon kini [nga kalan], kay mahal na ang mga tangke sa LPG karong mga panahona. Mas barato na ang pagpalit og segunda-manong lana gikan sa talyer.”",
        },
      },
    ],
  },

  // crossfade sequence: img 15, 16
  {
    type: "scroll-crossfade",
    id: "media-15-to-16",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/15.jpg",
        caption: {
          EN: "Meanwhile, dinner is served in the household of Linda Lumintad, a 65-year-old farmer.",
          CEB: "Samtang, ang panihapon gisilbi sa panimalay ni Linda Lumintad, usa ka 65 anyos nga mag-uuma.",
        },
      },
      {
        kind: "participant-photo",
        src: "/images/16.jpg",
        copyright: "© Ren 2026 | ‘Makigduyog sa Yuta’",
        caption: {
          EN: "“Yellow corn. Even a small serving is already filling.”",
          CEB: "“Dilaw nga mais, gamay nga pagkaon, takos kini sa kabusog”",
        },
      },
    ],
  },

  // text block: body paragraph 2
  {
    type: "text-block",
    id: "body-text-2",
    paragraphs: {
      EN: [
        "The seeds planted months ago have matured into crops ready for harvest.",
        "Farmhands are hired, often family friends or family themselves. Harvesters and trucks are brought in as well to expedite the process, though not all farmers have access to these machinery. Some continue to hand harvest out of necessity.",
        "As they step on the field once more, farmers must work with weather conditions that have only become more unpredictable.",
        "“A lot has been changing over the years. [The weather patterns] are not as pronounced as before. It’s erratic. It rains during the summer season; it gets dry during the wet season, even during August (typically in the middle of the wet season), there was one week with no rain at all.” Municipal agriculturist of Manolo Fortich, Gemma Cania, observes.",
        "These changing weather patterns have affected how farmers plan. According to Manolo Fortich councilor and farmer Elzevir Dagunlay, “Climate change thwarts the predictions of farmers. It’s so different nowadays, unlike ten or twenty years ago, you could predict the season and prepare your land. Now, our rainfall pattern here in Bukidnon is not the same.”",
      ],
      CEB: [
        "Ang mga liso nga gitanom pipila ka bulan ang milabay hinog na ug andam na anihon.",
        "Ang mga trabahante sa uma gisuholan, kasagaran mga higala sa pamilya o pamilya mismo. Ang mga tig-ani ug mga trak gidala ingon man sa mapadali ang proseso, bisan dili tanang mag-uuma ang makagamit niini nga mga makinarya. Ang uban nagpadayon sa pag-ani pinaagi sa kamot tungod sa panginahanglan.",
        "Samtang motapak na usab sila sa uma, ang mga mag-uuma kinahanglan nga moatubang sa mga kondisyon sa panahon nga nahimong dili matag-an.",
        "“Daghan na ang nausab sa milabay nga mga katuigan. [Ang mga sumbanan sa panahon] dili na sama ka klaro sa kaniadto. Dili kini kanunay. Moulan panahon sa ting-init; mouga panahon sa ting-ulan, bisan sa Agosto (kasagaran sa tunga-tunga sa ting-ulan), adunay usa ka semana nga walay ulan.” Namatikdan sa municipal agriculturist sa Manolo Fortich, si Gemma Cania.",
        "Kining nagkausab-usab nga mga sumbanan sa panahon nakaapekto sa pagplano sa mga mag-uuma. Sumala ni Manolo Fortich konsehal ug mag-uuma nga si Elzevir Dagunlay, “Ang pagbag-o sa klima nakababag sa mga panagna sa mga mag-uuma. Lahi na kaayo karon, dili sama sa napulo o baynte ka tuig ang milabay, mahimo nimong matagna ang panahon ug maandam ang imong yuta. Karon, ang among sumbanan sa ulan dinhi sa Bukidnon dili na parehas.”",
      ],
    },
  },

  // img 17
  {
    type: "author-full-width",
    id: "media-17",
    src: "/images/17.jpg",
    caption: {
      EN: "Dagunlay also notes that despite Manolo Fortich being an upland municipality, the heat can still get extreme.",
      CEB: "Gipunting usab ni Dagunlay nga bisan pa sa pagka-munisipalidad sa Manolo Fortich sa kabukiran, ang kainit mahimo gihapon nga mograbe.",
    },
  },

  // overlay sequence: img 18, 19
  {
    type: "scroll-crossfade",
    id: "media-18-to-19",
    showLabel: true,
    steps: [
      {
        kind: "author",
        src: "/images/18.jpg",
        caption: { EN: "", CEB: "" },
      },
      {
        kind: "participant-video",
        src: "/videos/19.mp4",
        copyright: "© Flor 2026 | ‘Makigduyog sa Yuta’",
        caption: {
          EN: "“Corn harvesting.”",
          CEB: "“Pagharvest ng mais.”",
        },
      },
    ],
  },

  // img 20
  {
    type: "author-full-width",
    id: "media-20",
    src: "/images/20.jpg",
    caption: {
      EN: "Even during the dry season, sudden downpour can interrupt harvest days.",
      CEB: "Bisan sa ting-init, ang kalit nga pagbundak sa ulan mahimong makabalda sa mga adlaw sa pag-ani.",
    },
  },

  // text block: body paragraph 3
  {
    type: "text-block",
    id: "body-text-3",
    paragraphs: {
      EN: [
        "Other farmers skip farming during the day completely.",
        "Lumintad works with her son, Ren, around 6 in the evening. She says that it gets really hot when working during the midday, so working at night or early morning, around 4:00AM, lets them avoid the heat. Additionally, working at night or early morning is what her schedule often permits.",
      ],
      CEB: [
        "Ang ubang mga mag-uuma hingpit nga molikay sa pagpanguma panahon sa adlaw.",
        "Si Lumintad nagtrabaho uban sa iyang anak nga si Ren, mga alas 6 sa gabii. Matod niya nga init kaayo kon magtrabaho sa udto, mao nga ang pagtrabaho sa gabii o sayo sa buntag, mga alas 4:00 sa buntag, makatabang nila nga malikayan ang kainit. Dugang pa, ang pagtrabaho sa gabii o sayo sa buntag mao ang kasagarang gitugot sa iyang iskedyul.",
      ],
    },
  },

  // img 21
  {
    type: "author-full-width",
    id: "media-21",
    src: "/images/21.jpg",
    caption: { EN: "", CEB: "" },
  },

  // img 22
  {
    type: "author-full-width",
    id: "media-22",
    src: "/images/22.jpg",
    caption: {
      EN: "A portrait of Linda Lumintad in Lingion, Manolo Fortich.",
      CEB: "Usa ka hulagway ni Linda Lumintad sa Lingion, Manolo Fortich.",
    },
  },

  // text block: body paragraph 4
  {
    type: "text-block",
    id: "body-text-4",
    paragraphs: {
      EN: [
        "Lumintad likens planting to making a shot; “sometimes you miss, other times you score.”",
        "Current climate conditions, along with El Niño, worsens the odds of farmers.",
        "According to Cania, the Municipal Agriculture Office (MAO) of Manolo Fortich have already received many reports of crop damage during the current El Niño cycle. “Those who planted earlier, around May, were safe because their crops could reach maturity, especially corn. But it’s difficult already for those who planted later on, from July to August. Those crops were really damaged.”",
        "For a community deeply rooted in agriculture, crop damage as a result of climate events like El Niño considerably impacts their livelihood and food security.",
        "Lenerio Sumuhoy, a farmer, forest guard, and member of the Higaonon, was still a child when he was working for the family farm. He shared that his family could ask neighbours to have some of their produce with no charge. But the rising cost of living over the years dictated the end of this practice. Now, they must buy the produce from their neighbours.",
        "Sumuhoy, now 61, went to his bodega, a weathered bamboo hut that had served as his previous home, and took some ears of corn. It had been stunted as a result of both overheating and oversoaking. He also mentioned that the lack of fertilizer did not help.",
        "Sumuhoy says that despite the challenges, he continues to maintain the farming tradition, as his wish is to let his 10 children, one of which is on the brink of finishing their studies, inherit a fertile land.",
      ],
      CEB: [
        "Gitandi ni Lumintad ang pagtanom sa usa ka tira; “usahay masipyat ka, usahay maka-iskor ka.”",
        "Ang kasamtangang kahimtang sa klima, uban sa El Niño, mograbe ang tsansa sa mga mag-uuma.",
        "Sumala ni Cania, ang Municipal Agriculture Office (MAO) sa Manolo Fortich adunay nakadawat na og daghang mga report sa kadaot sa mga tanom atol sa kasamtangang El Niño cycle. “Kadtong mga nagtanom og sayo, mga Mayo, luwas tungod kay ang ilang mga tanom mahimong mohinog, labi na ang mais. Apan lisod na alang niadtong mga nagtanom og ulahi, gikan sa Hulyo hangtod Agosto. Kadtong mga tanom nadaot gyud.”",
        "Alang sa usa ka komunidad nga lawom nga nakagamot sa agrikultura, ang kadaot sa mga tanom tungod sa mga panghitabo sa klima sama sa El Niño adunay dakong epekto sa ilang panginabuhian ug seguridad sa pagkaon.",
        "Si Lenerio Sumuhoy, usa ka mag-uuma, guwardiya sa kalasangan, ug miyembro sa Higaonon, bata pa sa dihang nagtrabaho siya sa umahan sa pamilya. Gipaambit niya nga ang iyang pamilya makapangayo sa mga silingan nga makakuha sa ilang mga produkto nga walay bayad. Apan ang nagkataas nga gasto sa panginabuhi sa daghang katuigan nagdikta sa katapusan niini nga praktis. Karon, kinahanglan na nilang paliton ang mga produkto gikan sa ilang mga silingan.",
        "Si Sumuhoy, nga karon 61 anyos na, miadto sa iyang bodega, usa ka payag nga kawayan nga kaniadto iyang gipuy-an, ug nanguha og pipila ka uhay sa mais. Kini na-stuck tungod sa sobrang kainit ug pagkabasa. Nahisgotan usab niya nga ang kakulang sa abono wala makatabang.",
        "Matod ni Sumuhoy nga bisan pa sa mga hagit, padayon niyang gipadayon ang tradisyon sa pagpanguma, kay ang iyang pangandoy mao nga ang iyang 10 ka mga anak, nga usa niini hapit na mahuman sa ilang pagtuon, makapanunod og tabunok nga yuta.",
      ],
    },
  },

  // crossfade sequence: img 23, 24, 25
  {
    type: "scroll-crossfade",
    id: "media-23-to-25",
    showLabel: true,
    steps: [
      { kind: "author", src: "/images/23.jpg", caption: { EN: "", CEB: "" } },
      { kind: "author", src: "/images/24.jpg", caption: { EN: "", CEB: "" } },
      { kind: "author", src: "/images/25.jpg", caption: { EN: "", CEB: "" } },
    ],
  },

  // text block: ending line
  {
    type: "text-block",
    id: "body-text-5",
    paragraphs: {
      EN: [
        "The Super El Niño cycle is expected to persist into the first half of 2027.",
      ],
      CEB: ["Ang Super El Nino magpapadayon hangtod sa unang katunga sa 2027."],
    },
  },

  // img 26
  {
    type: "author-full-width",
    id: "media-26",
    src: "/images/26.jpg",
    caption: { EN: "", CEB: "" },
  },
]

export default function Home() {
  const [activeLang, setActiveLang] = useState<Language>("EN")

  const localizedStepsByBlockId = useMemo(() => {
    const map: Record<string, CrossfadeStep[]> = {}
    for (const block of essayContent) {
      if (block.type === "scroll-crossfade") {
        map[block.id] = block.steps.map((step) => ({
          ...step,
          caption: step.caption ? step.caption[activeLang] : undefined,
        }))
      }
    }
    return map
  }, [activeLang])

  return (
    <main className="min-h-screen bg-offblack select-none">
      <Hero
        src="/images/1.jpg"
        title="MAKIGDUYOG SA YUTA"
        subtitle={heroSubtitle[activeLang]}
      />

      <LanguageToggle
        activeLang={activeLang}
        setActiveLang={setActiveLang}
      />

      <article className="">
        {essayContent.map((block) => {
          if (block.type === "text-block") {
            return (
              <div
                key={block.id}
                className="max-w-2xl mx-auto px-5 my-10 md:my-16 space-y-4 md:space-y-6"
              >
                {block.paragraphs[activeLang].map((paragraph, idx) => (
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
                caption={block.caption[activeLang]}
              />
            )
          }

          if (block.type === "author-photo") {
            return (
              <AuthorPhoto
                key={block.id}
                src={block.src}
                alt={block.alt}
                caption={block.caption?.[activeLang]}
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
                caption={block.caption?.[activeLang]}
              />
            )
          }

          if (block.type === "participant-video") {
            return (
              <ParticipantVideo
                key={block.id}
                src={block.src}
                copyright={block.copyright}
                caption={block.caption?.[activeLang]}
              />
            )
          }

          if (block.type === "scroll-crossfade") {
            return (
              <ScrollCrossfade
                key={block.id}
                steps={localizedStepsByBlockId[block.id]}
                showLabel={block.showLabel}
              />
            )
          }

          return null
        })}
      </article>

      <Footer activeLang={activeLang} />
    </main>
  )
}
