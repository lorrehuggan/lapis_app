import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

const now = new Date().toISOString();

export const userTable = sqliteTable(
  "user",
  {
    id: text("id").notNull().primaryKey().unique(),
    name: text("name"),
    email: text("email").notNull(),
    createdAt: text("created_at", {
      mode: "text",
    })
      .notNull()
      .default(now),
    updatedAt: text("updated_at", {
      mode: "text",
    })
      .notNull()
      .default(now),
  },
  (table) => {
    return {
      idIndex: index("id_index").on(table.id),
    };
  },
);

export const insertUserSchema = createInsertSchema(userTable);
export const selectUserSchema = createSelectSchema(userTable);
export type User = z.infer<typeof selectUserSchema>;

export const sessionTable = sqliteTable(
  "session",
  {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => userTable.id),
    userEmail: text("user_email"),
    fresh: integer("fresh", {
      mode: "boolean",
    })
      .notNull()
      .default(true),
    expiresAt: integer("expires_at", {
      mode: "timestamp",
    }).notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
  },
  (table) => {
    return {
      userIndex: index("user_index").on(table.userId),
    };
  },
);

export const insertSessionSchema = createInsertSchema(sessionTable);
export const selectSessionSchema = createSelectSchema(sessionTable);
export type Session = z.infer<typeof selectSessionSchema>;
