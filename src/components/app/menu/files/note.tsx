"use client";
import { deleteNote, trashNote } from "@/lib/actions/editor";
import type { Note } from "@/lib/db/schema/note";
import clsx from "clsx";
import { ChevronRight, FileText, Trash2 } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  note: Note;
  dragging?: string | null;
  trash?: boolean;
};
export default function Note({ note, dragging, trash }: Props) {
  const params = usePathname();
  const dn = deleteNote.bind(null, { id: note.id });
  const tn = trashNote.bind(null, { id: note.id });
  return (
    <div
      key={note.id}
      className={clsx(
        "flex p-[2px] rounded group items-center gap-1 text-muted-foreground w-full hover:text-foreground",
        {
          "bg-gray-200": dragging === note.id,
        },
      )}
    >
      {params.includes(note.id) && dragging !== note.id ? (
        <ChevronRight size={16} />
      ) : (
        <FileText size={16} />
      )}
      <div className="flex items-center justify-between w-full">
        <a
          className={clsx("w-full line-clamp-1 text-xs font-medium", {
            "text-primary": params.includes(note.id),
          })}
          href={`/app/editor/${note.id}`}
        >
          {note.title}
        </a>
        {trash && <Trash2 onClick={() => dn()} size={16} />}
      </div>
    </div>
  );
}
