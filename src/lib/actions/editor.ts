"use server";

import { JSONContent } from "@tiptap/react";
import { revalidatePath } from "next/cache";
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
      });
    return revalidatePath("/app/editor");
  } catch (error) {
    console.log(error);
  }
}
