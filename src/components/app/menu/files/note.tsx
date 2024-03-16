import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Note } from "@/lib/db/schema/note";
import { FileText } from "lucide-react";

type Props = {
  note: Note;
};
export default function Note({ note }: Props) {
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
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
