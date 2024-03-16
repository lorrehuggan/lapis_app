"use server";

import { JSONContent } from "@tiptap/react";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { db } from "../db";
import { noteTable } from "../db/schema/note";
import { getTitle, getZettelLinks } from "../editor/helpers";

export async function saveNote({
  content,
  description,
  folder,
  id,
}: {
  content?: string;
  description: "No description" | string;
  folder: string | null;
  id?: string | null;
}) {
  "use server";
  // clean up and add try catch etc
  console.log("saveNote");

  if (!content) {
    return;
  }

  const doc: JSONContent = JSON.parse(content);

  const schema = z.object({
    content: z.string(),
    description: z.string().nullable(),
    folder: z.string().nullable(),
    title: z.string(),
    id: z.string().nullable(),
  });
  const parsed = schema.parse({
    content,
    title: getTitle(doc.content),
    description,
    folder,
    id,
  });

  const zettelLinks = getZettelLinks(doc.content);
  let noteId = "";
  try {
    const note = await db
      .insert(noteTable)
      .values({
        content: parsed.content,
        title: parsed.title,
        description,
        folder,
        id: id ? id : uuidv4(),
        user: "12345",
        zettels: JSON.stringify(zettelLinks),
        updateAt: new Date().toISOString(),
      })
      .onConflictDoUpdate({
        target: [noteTable.id],
        set: {
          updateAt: new Date().toISOString(),
          content: parsed.content,
          title: parsed.title,
          description,
          folder,
          zettels: JSON.stringify(zettelLinks),
        },
      })
      .returning({
        id: noteTable.id,
      });
    noteId = note[0].id;
  } catch (error) {
    console.log(error);
  }
  return redirect(`/app/editor/${noteId}`);
}

export async function deleteNote({ id }: { id: string }) {
  "use server";
  const schema = z.object({
    id: z.string(),
  });
  const parsed = schema.parse({ id });
  try {
    await db.delete(noteTable).where(eq(noteTable.id, parsed.id));
  } catch (error) {
    console.log(error);
  }
  return redirect("/app/editor");
}

export async function trashNote({ id }: { id: string }) {
  "use server";
  const schema = z.object({
    id: z.string(),
  });
  const parsed = schema.parse({ id });
  try {
    await db
      .update(noteTable)
      .set({ trashed: true })
      .where(eq(noteTable.id, parsed.id));
  } catch (error) {
    console.log(error);
  }
  return redirect("/app/editor");
}
