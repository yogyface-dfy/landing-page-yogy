/**
 * Client Airtable — passe par NOTRE backend (/api/airtable).
 *
 * IMPORTANT : aucun token ici. Le token Airtable vit uniquement côté serveur
 * (voir server.js). Le navigateur ne voit jamais de credentials.
 */

/**
 * Crée un enregistrement dans une table Airtable via le backend sécurisé.
 * @param {string} tableName — nom exact de la table (doit être autorisée côté serveur)
 * @param {Record<string, any>} fields — map champ → valeur
 * @returns {Promise<{id: string}>} enregistrement créé
 */
export async function createRecord(tableName, fields) {
  const res = await fetch('/api/airtable', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ table: tableName, fields }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error || `Erreur ${res.status}`)
  }

  return res.json()
}
