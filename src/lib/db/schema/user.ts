import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const userTable = sqliteTable(
  "user",
  {
    id: text("id").notNull().primaryKey().unique(),
    name: text("name"),
    email: text("email").notNull(),
    createdAt: text("created_at").notNull().default(new Date().toISOString()),
    updateAt: text("updated_at").notNull().default(new Date().toISOString()),
  },
  (table) => {
    return {
      idIdx: index("user_id_idx").on(table.id),
    };
  },
);

export const insertUserSchema = createInsertSchema(userTable);
export const selectUserSchema = createSelectSchema(userTable);
export type User = z.infer<typeof selectUserSchema>;
