import TextEditor from "@/components/app/editor";
import { validateRequest } from "@/lib/authentication";
import { db } from "@/lib/db";
import { noteTable } from "@/lib/db/schema/note";
import { JSONContent } from "@tiptap/react";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { session } = await validateRequest();
  if (!session) redirect("/login");

  if (!params.id) return null;
  const note = await db
    .select({
      content: noteTable.content,
    })
    .from(noteTable)
    .where(eq(noteTable.id, params.id));

  if (!note[0].content) return null;
  const n: JSONContent = JSON.parse(note[0].content);

  return (
    <section className="col-span-9">
      <TextEditor note={n} id={params.id} user={session.userId} />
    </section>
  );
}
