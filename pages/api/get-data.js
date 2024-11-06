// pages/api/get-data.js
import db from '../../lib/db';  // Importe le client PostgreSQL

export default async function handler(req, res) {
  try {
    const result = await db.query('SELECT * FROM users');  // Exemple de requête
    res.status(200).json(result.rows);  // Renvoyer les résultats en JSON
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
