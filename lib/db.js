// lib/db.js
import { Client } from 'pg';

// Créer un client PostgreSQL avec les variables d'environnement
const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,  // Par exemple 'postgres-service' en Kubernetes
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Se connecter à PostgreSQL
client.connect();

export default client;
