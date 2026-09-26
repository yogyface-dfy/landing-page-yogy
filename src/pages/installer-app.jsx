import SEO from '../components/SEO'
import Icon from '../components/Icon'
import AppVideo from '../components/app-video'

const TUTOS = [
  {
    id: 'iphone',
    label: 'iPhone',
    src: '/videos/tuto-webapp-iphone.mp4',
    poster: '/videos/tuto-webapp-iphone.webp',
    title: 'Installer YoGyFace sur iPhone',
  },
  {
    id: 'android',
    label: 'Android',
    src: '/videos/tuto-webapp-android.mp4',
    poster: '/videos/tuto-webapp-android.webp',
    title: 'Installer YoGyFace sur Android',
  },
]

/** Tutoriels d’installation de la web app sur l’écran d’accueil. */
export default function InstallerApp() {
  return (
    <>
      <SEO
        title="Installer l'application"
        description="Comment installer YoGyFace sur l'écran d'accueil de ton iPhone ou Android, en 1 minute."
        path="/installer-app"
      />

      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-[5%] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-rose/25 via-white to-creme pointer-events-none" />

        <div className="max-w-[900px] mx-auto relative z-10 text-center">
          <div className="section-badge justify-center mx-auto">
            <Icon name="phone" size={14} />
            Écran d'accueil
          </div>
          <h1 className="font-display text-[clamp(1.8rem,6vw,3.4rem)] font-black leading-[0.95] tracking-tighter text-noir mt-5 mb-4">
            COMMENT INSTALLER
            <br />
            <span className="font-serif italic text-corail font-semibold">
              l'application
            </span>
          </h1>
          <p className="text-gris text-[15px] md:text-[17px] leading-relaxed max-w-xl mx-auto mb-12">
            Sur ton écran d'accueil, comme une vraie app. Choisis ton téléphone,
            lance la vidéo — ça prend moins de deux minutes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 items-start">
            {TUTOS.map((t) => (
              <article key={t.id} className="text-center">
                <p className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-noir text-white text-xs font-semibold uppercase tracking-widest mb-4">
                  {t.label}
                </p>
                <AppVideo src={t.src} poster={t.poster} title={t.title} />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
