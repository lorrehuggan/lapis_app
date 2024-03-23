import { db } from "@/lib/db";
import { folderTable, noteTable } from "@/lib/db/schema/note";
import { eq } from "drizzle-orm";
import Files from "../menu/files";
import Nav from "./nav";

export default async function Menu() {
  const notes = await db
    .select()
    .from(noteTable)
    .where(eq(noteTable.user, "12345"));
  const folders = await db
    .select()
    .from(folderTable)
    .where(eq(folderTable.user, "12345"));

  return (
    <section className="col-span-2 grid grid-cols-4 border-r-[1px] border-muted-foreground/20">
      <div className="border-r-[1px] py-4 border-muted-foreground/20 px-4 flex flex-col shadow-lg items-center">
        <Nav />
      </div>
      <div className="col-span-3 px-4 text-sm pt-4 bg-muted">
        <Files notes={notes} folders={folders} />
      </div>
    </section>
  );
}
