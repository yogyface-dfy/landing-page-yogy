import FunnelPlayer from './funnel-player'

const CF = 'https://d1yei2z3i6k35z.cloudfront.net/6457367'

/** Témoignages vidéo extraits de la VSL Systeme.io (MP4 CloudFront). */
const CLIPS = [
  { name: 'Mélanie', age: '37 ans', src: `${CF}/681a905f79f65_melanie.mp4`, poster: `${CF}/68b4378e5dc46_melanie.png` },
  { name: 'Marie', age: '37 ans', src: `${CF}/681a8b75d0125_MARIE.mp4` },
  { name: 'Sandrine', age: '37 ans', src: `${CF}/679bd218d3168_sandrinetemoignage1.mp4` },
  { name: 'Audrey', age: '40 ans', src: `${CF}/681cc576de078_temoignageaudrey.mp4`, poster: `${CF}/68b440334c423_audrey.png` },
  { name: 'Julie', age: '38 ans', src: `${CF}/681ceb8ca7c04_juliatemoignage.mp4` },
  { name: 'Céline', age: '54 ans', src: `${CF}/6737c1badca94_Temoignageceline54ans.mp4`, poster: `${CF}/68b43e920611b_celine.png` },
  { name: 'Marion', age: '32 ans', src: `${CF}/681cda93c3a4e_TEMOIGNAGEMARION.mp4` },
  { name: 'Charlène', age: '32 ans', src: `${CF}/681d20a1e11d7_CHarlenetemoignage.mp4`, poster: `${CF}/68b43493083f0_charlene.png` },
  { name: 'Fanny', age: '36 ans', src: `${CF}/681d14f73db17_fannytemoignage.mp4` },
  { name: 'Agathe', age: '27 ans', src: `${CF}/681ce07f08a62_TEMOIGNAGEAGATHE.mp4` },
  { name: 'Julia', age: '32 ans', src: `${CF}/681ce4c274001_temoignageJULIA.mp4` },
  { name: 'Julie', age: '28 ans', src: `${CF}/68625c3030f6a_JULIE.mp4` },
  { name: 'Céline', age: '32 ans', src: `${CF}/681cd21de08a1_temoignageceline.mp4`, poster: `${CF}/68b440a30704a_celinee.png` },
  { name: 'Carine & Céline', src: `${CF}/6820f863c7a90_TEMOIGNAGECARINEETCELINE-copie.mp4` },
]

export default function VenteTemoignagesVideo() {
  return (
    <section id="temoignages" className="py-14 md:py-20 bg-creme scroll-mt-24">
      <div className="px-[5%] max-w-[1100px] mx-auto text-center mb-8">
        <p className="section-badge justify-center">Elles en parlent</p>
        <h2 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-tighter text-noir">
          DES VOIX RÉELLES,
          <br />
          <span className="font-serif italic text-corail font-semibold">
            pas des slogans
          </span>
        </h2>
      </div>
      <div
        className="flex gap-3 md:gap-4 overflow-x-auto px-[8%] md:px-[5%] snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Témoignages vidéo"
      >
        {CLIPS.map((c) => (
          <article
            key={c.src}
            className="snap-center shrink-0 w-[78%] sm:w-[44%] md:w-[30%] rounded-2xl overflow-hidden bg-white border border-noir/5"
          >
            <FunnelPlayer
              src={c.src}
              poster={c.poster}
              title={`Témoignage ${c.name}`}
              className="aspect-video"
              showPlay
            />
            <p className="p-3 text-left font-display font-black text-[14px] text-noir tracking-tight">
              {c.name}
              {c.age ? (
                <span className="font-sans font-normal text-gris text-[12px] ml-1.5">
                  {c.age}
                </span>
              ) : null}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
