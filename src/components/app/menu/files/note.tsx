import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { deleteNote } from "@/lib/actions/editor";
import type { Note } from "@/lib/db/schema/note";
import { FileText } from "lucide-react";

type Props = {
  note: Note;
};
export default async function Note({ note }: Props) {
  const dn = deleteNote.bind(null, { id: note.id });
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <li key={note.id} className="flex items-center gap-1 w-full">
          <FileText size={16} />
          <a className="w-full line-clamp-1" href={`/app/editor/${note.id}`}>
            {note.title}
          </a>
        </li>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <form action={dn}>
            <button type="submit">delete</button>
          </form>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
