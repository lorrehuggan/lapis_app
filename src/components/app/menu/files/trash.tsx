"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import type { Note as NoteType } from "@/lib/db/schema/note";
import { Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { Trash2, TrashIcon } from "lucide-react";
import { useState } from "react";
import Note from "./note";

type Props = {
  notes: NoteType[];
};

export default function Trash({ notes }: Props) {
  const [open, setOpen] = useState(false);
  const trashedNotes = notes.filter((note) => note.trashed);
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <div className="w-full cursor-pointer flex items-center gap-1">
              {trashedNotes.length > 0 ? (
                <Trash2 size={16} className="text-destructive" />
              ) : (
                <TrashIcon size={16} />
              )}
              <span
                className={clsx(
                  "line-clamp-1 font-bold transition-colors ease-out",
                  {
                    "text-destructive": trashedNotes.length > 0,
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Delete
          <ContextMenuShortcut>
            <TrashIcon size={16} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>
            <TrashIcon size={16} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
