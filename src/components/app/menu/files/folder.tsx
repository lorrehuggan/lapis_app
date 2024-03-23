"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Folder, Note as NoteType } from "@/lib/db/schema/note";
import { FolderIcon, FolderOpenIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Note from "./note";

type Props = {
  folder: Folder;
  notes: NoteType[];
};

export default function Folder({ folder, notes }: Props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(false);
  const folderNotes = notes.filter(
    (note) => note.folder === folder.id && !note.trashed,
  );
  const formref = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    // set input to false when click outside of form /formref.current
    const handleClick = (e: MouseEvent) => {
      if (formref.current && !formref.current.contains(e.target as Node)) {
        setInput(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  if (input) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("submitting form");
          setInput(false);
        }}
        ref={formref}
        onDoubleClick={() => setInput(!input)}
        onBlur={() => setInput(false)}
      >
        <input
          name="folder"
          type="text"
          className="w-full text-xs p-[4px] rounded bg-transparent border-[1px] border-foreground/50"
          placeholder={folder.name}
        />
      </form>
    );
  }

  return (
    <Collapsible
      onDoubleClick={() => setInput(!input)}
      open={open}
      onOpenChange={setOpen}
      key={folder.id}
    >
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
  );
}
