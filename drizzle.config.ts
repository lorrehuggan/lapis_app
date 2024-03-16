import { env } from "@/lib/env";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/lib/db/schema/*",
  out: "./src/lib/db/migrations",
  driver: "libsql",
  dbCredentials: {
    url: env.DATABASE_URL,
    // authToken: env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
