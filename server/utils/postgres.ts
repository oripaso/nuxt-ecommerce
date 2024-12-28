import postgres from "postgres";
// https://hub.nuxt.com/docs/recipes/postgres DOCS
// https://www.npmjs.com/package/postgres
export function usePostgres() {
  if (!process.env.NUXT_POSTGRES_URL) {
    throw createError("Missing `NUXT_POSTGRES_URL` environment variable");
  }

  return postgres(process.env.NUXT_POSTGRES_URL as string, {
    ssl: "require",
  });
}