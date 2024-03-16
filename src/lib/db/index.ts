// import { sessionTable, userTable } from './schema/user';
// import { env } from '@lib/env/server';
import { createClient } from "@libsql/client";
// import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { drizzle } from "drizzle-orm/libsql";
import { env } from "../env";
import { folderTable, noteTable } from "./schema/note";
import { userTable } from "./schema/user";

const sqliteClient = createClient({
  url: env.DATABASE_URL,
  // authToken: env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(sqliteClient, {
  schema: {
    user: userTable,
    // session: sessionTable,
    note: noteTable,
    folder: folderTable,
  },
});

// export const dbAdapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);
