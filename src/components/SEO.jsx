import { Head } from 'vite-react-ssg'

const SITE = 'https://yogyface.fr'
// ?v= casse le cache Facebook / iMessage quand on change le visuel.
const DEFAULT_IMAGE = `${SITE}/og-image.jpg?v=20260830`

/**
 * Per-page SEO head tags.
 * @param {{ title: string, description: string, path?: string, image?: string, noindex?: boolean }} props
 */
export default function SEO({ title, description, path = '/', image = DEFAULT_IMAGE, noindex = false }) {
  const url = `${SITE}${path}`
  const fullTitle = `${title} | YoGyFace`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="YoGyFace" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  )
}
