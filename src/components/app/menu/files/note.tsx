import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { deleteNote, trashNote } from "@/lib/actions/editor";
import type { Note } from "@/lib/db/schema/note";
import { FileText } from "lucide-react";

type Props = {
  note: Note;
};
export default function Note({ note }: Props) {
  const dn = deleteNote.bind(null, { id: note.id });
  const tn = trashNote.bind(null, { id: note.id });
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div key={note.id} className="flex items-center gap-1 w-full">
          <FileText size={16} />
          <a className="w-full line-clamp-1" href={`/app/editor/${note.id}`}>
            {note.title}
          </a>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <form action={note.trashed ? dn : tn}>
            <button type="submit">delete</button>
          </form>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
