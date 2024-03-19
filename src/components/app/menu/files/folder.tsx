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
import type { Folder, Note as NoteType } from "@/lib/db/schema/note";
import { FolderIcon, FolderOpenIcon, Trash } from "lucide-react";
import { useState } from "react";
import Note from "./note";

type Props = {
  folder: Folder;
  notes: NoteType[];
};

export default function Folder({ folder, notes }: Props) {
  const [open, setOpen] = useState(false);
  const folderNotes = notes.filter(
    (note) => note.folder === folder.id && !note.trashed,
  );

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Collapsible open={open} onOpenChange={setOpen} key={folder.id}>
          <CollapsibleTrigger asChild>
            <div className="w-full cursor-pointer flex items-center gap-1 p-[2px] rounded">
              {open ? <FolderOpenIcon size={16} /> : <FolderIcon size={16} />}
              <span className="line-clamp-1 font-bold">{folder.name}</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent asChild>
            <ul className="pl-5">
              {folderNotes.length > 0 ? (
                folderNotes.map((note) => <Note key={note.id} note={note} />)
              ) : (
                <li className="text-muted-foreground text-xs">Empty folder</li>
              )}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          Delete
          <ContextMenuShortcut>
            <Trash size={16} />
          </ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Rename
          <ContextMenuShortcut>
            <Trash size={16} />
          </ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
