import { db } from "@/lib/db";
import { noteTable } from "@/lib/db/schema/note";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default async function App() {
  const note = await db
    .insert(noteTable)
    .values({
      title: `Untitled Note ${new Date().toISOString()}`,
      content: JSON.stringify({
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: {
              level: 1,
            },
            content: [
              {
                type: "text",
                text: `Untitled Note`,
              },
            ],
          },
        ],
      }),
      user: "12345",
      id: uuidv4(),
    })
    .returning({
      id: noteTable.id,
    });

  redirect(`/app/editor/${note[0].id}`);
}
