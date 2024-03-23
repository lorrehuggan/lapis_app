"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Note as NoteType } from "@/lib/db/schema/note";
import { Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { Trash2, TrashIcon } from "lucide-react";
import { useState } from "react";
import Note from "./note";

type Props = {
  notes: NoteType[];
  active?: boolean;
};

export default function Trash({ notes, active }: Props) {
  const [open, setOpen] = useState(false);
  const trashedNotes = notes.filter((note) => note.trashed);
  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <div className="w-full cursor-pointer flex items-center gap-1">
            {trashedNotes.length > 0 ? (
              <Trash2 size={16} className="" />
            ) : (
              <TrashIcon
                size={16}
                className={clsx("transition-colors ease-out", {
                  "text-destructive": active,
                })}
              />
            )}
            <span
              className={clsx(
                "line-clamp-1 font-bold transition-colors ease-out",
                {
                  "text-destructive": active,
                },
              )}
            >
              Trash
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent asChild>
          <ul className="pl-5">
            {trashedNotes.length > 0 ? (
              trashedNotes.map((note, i) => {
                return (
                  <Draggable
                    key={note.id}
                    draggableId={`trash*${note.id}`}
                    index={i}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Note key={note.id} note={note} trash={true} />
                      </li>
                    )}
                  </Draggable>
                );
              })
            ) : (
              <li className="text-muted-foreground text-xs">
                No trashed notes
              </li>
            )}
          </ul>
        </CollapsibleContent>
      </Collapsible>
      {active && (
        <p className="pl-4 text-xs text-muted-foreground">Drop Here</p>
      )}
    </>
  );
}
