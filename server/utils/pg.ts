import { Client } from "pg";

export function usePg() {
  // Ensure all required environment variables are present
  if (!process.env.PG_HOST || !process.env.PG_PORT || !process.env.PG_USER || !process.env.PG_PASSWORD || !process.env.PG_DATABASE) {
    throw new Error("Missing one or more required PG environment variables");
  }

  const client = new Client({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    ssl: { rejectUnauthorized: false }, // Ensure SSL connection if needed
  });

  return client;
}
