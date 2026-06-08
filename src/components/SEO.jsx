import { Helmet } from 'react-helmet-async'

const SITE = 'https://yogyface.fr'
const DEFAULT_IMAGE = `${SITE}/favicon.png`

/**
 * Per-page SEO head tags.
 * @param {{ title: string, description: string, path?: string, image?: string }} props
 */
export default function SEO({ title, description, path = '/', image = DEFAULT_IMAGE }) {
  const url = `${SITE}${path}`
  const fullTitle = `${title} | YoGyFace`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
