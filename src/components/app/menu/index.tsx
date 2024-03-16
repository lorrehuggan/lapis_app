import Folder from "@/components/app/menu/files/folder";
import Note from "@/components/app/menu/files/note";
import { db } from "@/lib/db";
import { folderTable, noteTable } from "@/lib/db/schema/note";
import Trash from "./files/trash";
import Nav from "./nav";

export default async function Menu() {
  const notes = await db.select().from(noteTable);
  const folders = await db.select().from(folderTable);

  return (
    <section className="col-span-2 grid grid-cols-4 border-r-[1px] border-muted-foreground/20">
      <div className="border-r-[1px] pt-4 border-muted-foreground/20 px-4 flex flex-col items-center">
        <Nav />
      </div>
      <div className="col-span-3 px-4 text-sm pt-4">
        <ul className="flex flex-col gap-1">
          <li>
            <a href="/app/editor">Go To Editor</a>
          </li>
          <li>
            <Trash notes={notes} />
          </li>
          {folders.map((folder) => {
            return (
              <li key={folder.id}>
                <Folder key={folder.id} folder={folder} notes={notes} />
              </li>
            );
          })}
          {notes.map((note) => {
            if (note.folder || note.trashed) {
              return null;
            }
            return (
              <li key={note.id}>
                <Note key={note.id} note={note} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
