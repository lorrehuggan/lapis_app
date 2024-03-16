import Folder from "@/components/app/menu/files/folder";
import Note from "@/components/app/menu/files/note";
import { db } from "@/lib/db";
import { folderTable, noteTable } from "@/lib/db/schema/note";

export default async function Menu() {
  const notes = await db.select().from(noteTable);
  const folders = await db.select().from(folderTable);

  return (
    <section className="col-span-2 grid grid-cols-4 border-r-[1px] border-muted-foreground/20">
      <div className="border-r-[1px] border-muted-foreground/20 px-4">Menu</div>
      <div className="col-span-3 px-4 text-sm pt-4">
        <ul className="space-y-1">
          <li>
            <a href="/app/editor">Go To Editor</a>
          </li>
          {folders.map((folder) => {
            return <Folder key={folder.id} folder={folder} notes={notes} />;
          })}
          {notes.map((note) => {
            if (note.folder) {
              return null;
            }
            return <Note key={note.id} note={note} />;
          })}
        </ul>
      </div>
    </section>
  );
}
