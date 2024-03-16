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
                <Trash2 size={16} />
              ) : (
                <TrashIcon size={16} />
              )}
              <span className="line-clamp-1">Trash</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent asChild>
            <ul className="pl-5">
              {trashedNotes.length > 0 ? (
                trashedNotes.map((note) => {
                  return (
                    <li key={note.id}>
                      <Note note={note} />
                    </li>
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
