import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { userTable } from "./user";

export const noteTable = sqliteTable("note", {
  id: text("id").notNull().primaryKey().unique(),
  user: text("user_id")
    .notNull()
    .references(() => userTable.id),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content", {
    mode: "text",
  }),
  folder: text("folder_id").references(() => folderTable.id),
  zettels: text("zettels").default("[]"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updateAt: text("updated_at").notNull().default(new Date().toISOString()),
});

export const insertNoteSchema = createInsertSchema(noteTable);
export const selectNoteSchema = createSelectSchema(noteTable);
export type Note = z.infer<typeof selectNoteSchema>;

export const folderTable = sqliteTable("folder", {
  id: text("id").notNull().primaryKey().unique(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
  updateAt: text("updated_at").notNull().default(new Date().toISOString()),
});

export const insertFolderSchema = createInsertSchema(folderTable);
export const selectFolderSchema = createSelectSchema(folderTable);
export type Folder = z.infer<typeof selectFolderSchema>;
