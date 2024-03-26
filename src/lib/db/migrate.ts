import { migrate } from "drizzle-orm/libsql/migrator";
import { db, sqliteClient } from ".";
// This will run migrations on the database, skipping the ones already applied
async function main() {
  await migrate(db, { migrationsFolder: "./migrations" });
  sqliteClient.close();
}

main();
