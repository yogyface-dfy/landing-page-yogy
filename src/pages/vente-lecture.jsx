import VenteOffre from '../components/vente-offre'

/** Copie de /vente. Les query du quiz personnalisent le texte. /vente ne lit pas ces clés. */
export default function VenteLecture() {
  return <VenteOffre variant="public" lecture />
}
