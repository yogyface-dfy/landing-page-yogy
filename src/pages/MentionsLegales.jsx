import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function MentionsLegales() {
  return (
    <section className="pt-32 md:pt-40 pb-24 px-[5%]">
      <SEO
        title="Mentions Légales"
        description="Mentions légales du site YoGyFace : éditeur, hébergement, propriété intellectuelle et informations de contact."
        path="/mentions-legales"
      />
      <div className="max-w-[800px] mx-auto">
        <div className="animate-on-scroll section-badge" data-anim="fade">Légal</div>
        <h1 className="animate-on-scroll font-display text-[clamp(2rem,5vw,3.5rem)] font-black tracking-tighter text-noir mb-4">
          MENTIONS LÉGALES
        </h1>
        <p className="text-gris text-sm mb-12">Dernière mise à jour : juin 2026</p>

        <div className="space-y-10 text-[15px] text-gris leading-relaxed break-words">
          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 1 — Éditeur du site</h2>
            <p>Le site <strong>www.yogyface.fr</strong> est édité par :</p>
            <ul className="mt-2 space-y-1 ml-4 list-disc">
              <li><strong>Société :</strong> TRACKS CONSULTANCY - F.Z.C</li>
              <li><strong>Forme juridique :</strong> Free Zone Company (F.Z.C)</li>
              <li><strong>Trade Licence :</strong> 44373</li>
              <li><strong>Représentée par :</strong> Laury Anater, gérante et fondatrice</li>
              <li><strong>Email :</strong> contact@yogyface.fr</li>
              <li><strong>Site :</strong> <a href="https://www.yogyface.fr" className="text-corail hover:underline">www.yogyface.fr</a></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 2 — Directeur de la publication</h2>
            <p><strong>Laury Anater</strong>, en sa qualité de gérante de TRACKS CONSULTANCY - F.Z.C.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 3 — Hébergement</h2>
            <p><strong>Hébergeur :</strong> Railway (Railway Corporation — 548 Market St, San Francisco, CA 94104, USA — <a href="https://railway.app" className="text-corail hover:underline" target="_blank" rel="noopener noreferrer">railway.app</a>)</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 4 — Objet du site</h2>
            <p>Le site www.yogyface.fr a pour objet la présentation et la commercialisation du programme numérique de yoga du visage « YoGyFace Reset », ainsi que la fourniture d'informations relatives à cette méthode de gymnastique faciale.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 5 — Propriété intellectuelle</h2>
            <p>L'ensemble du contenu présent sur le site (textes, images, vidéos, logos, graphismes, méthode RESET™, charte graphique, base de données, etc.) est la propriété exclusive de <strong>Laury Anater</strong> et de <strong>TRACKS CONSULTANCY - F.Z.C</strong>.</p>
            <p className="mt-2">La marque « YoGyFace », le nom de domaine « yogyface.fr » et tous les signes distinctifs sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction, représentation ou exploitation non autorisée est strictement interdite et constitue une contrefaçon (articles L.335-2 et suivants du Code de la Propriété Intellectuelle).</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 6 — Limitation de responsabilité</h2>
            <p>L'éditeur s'efforce d'assurer l'accessibilité du site 24h/24, 7j/7. Toutefois, l'accès peut être interrompu pour maintenance ou raisons techniques. L'éditeur ne saurait être tenu responsable des interruptions.</p>
            <div className="mt-3 p-4 bg-rose/10 rounded-xl border border-corail/10">
              <p className="text-noir font-semibold text-sm mb-1">Avertissement médical</p>
              <p className="text-sm">Les informations sur le yoga du visage sont données à titre informatif et pédagogique. Elles ne constituent en aucun cas un avis médical et ne sauraient se substituer à une consultation auprès d'un professionnel de santé qualifié.</p>
            </div>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 7 — Données personnelles</h2>
            <p>Les données personnelles collectées sont traitées conformément au RGPD. Vous disposez d'un droit d'accès, de rectification et de suppression en contactant <a href="mailto:contact@yogyface.fr" className="text-corail hover:underline">contact@yogyface.fr</a>.</p>
            <p className="mt-2">Pour plus de détails, consultez notre <Link to="/confidentialite" className="text-corail hover:underline">Politique de Confidentialité</Link>.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 8 — Cookies</h2>
            <p>Ce site n'utilise aucun cookie de tracking, d'analyse ou de marketing. Seuls des cookies strictement nécessaires au fonctionnement technique peuvent être utilisés.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 9 — Droit applicable</h2>
            <p>Les présentes mentions légales sont régies par le droit français. Tout litige sera soumis aux tribunaux français compétents.</p>
          </div>

          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-noir mb-3">Article 10 — Médiation</h2>
            <p>Conformément à l'article L.612-1 du Code de la consommation, vous pouvez recourir à un médiateur de la consommation. Plateforme européenne : <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-corail hover:underline">ec.europa.eu/consumers/odr</a>.</p>
          </div>

          <div className="pt-6 border-t border-noir/8">
            <p className="text-gris/50 text-xs">© 2026 — Laury Anater — YoGyFace · TRACKS CONSULTANCY - F.Z.C · Trade Licence 44373 · Tous droits réservés</p>
          </div>
        </div>
      </div>
    </section>
  )
}
