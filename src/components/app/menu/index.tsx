import { validateRequest } from "@/lib/authentication";
import { db } from "@/lib/db";
import { folderTable, noteTable } from "@/lib/db/schema/note";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Files from "../menu/files";
import Nav from "./nav";

export default async function Menu() {
  const { session } = await validateRequest();

  if (!session) redirect("/login");

  const notes = await db
    .select()
    .from(noteTable)
    .where(eq(noteTable.user, session.userId));
  const folders = await db
    .select()
    .from(folderTable)
    .where(eq(folderTable.user, session.userId));

  return (
    <section className="col-span-2 grid grid-cols-4 border-r-[1px] border-muted-foreground/20">
      <div className="flex flex-col items-center border-r-[1px] border-muted-foreground/20 px-4 py-4 shadow-lg">
        <Nav />
      </div>
      <div className="col-span-3 bg-muted px-4 pt-4 text-sm">
        <Files notes={notes} folders={folders} />
      </div>
    </section>
  );
}
