"use client";

import Folder from "@/components/app/menu/files/folder";
import Note from "@/components/app/menu/files/note";
import { Button } from "@/components/ui/button";
import { createFolder, restoreNote, trashNote } from "@/lib/actions/editor";
import type {
  Folder as FolderType,
  Note as NoteType,
} from "@/lib/db/schema/note";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Folders, Pen } from "lucide-react";
import { useState } from "react";
import Trash from "./trash";

type Props = {
  notes: NoteType[];
  folders: FolderType[];
};

export default function Files({ notes, folders }: Props) {
  const [dragging, setDragging] = useState<string | null>(null);
  const [isHoveringTrash, setIsHoveringTrash] = useState<boolean>(false);
  return (
    <>
      <div className="flex items-center gap-1 mb-2">
        <Button variant="outline" asChild size="icon">
          <a href="/app/editor">
            <Pen size={16} />
          </a>
        </Button>
        <Button variant="outline" size="icon" onClick={() => createFolder()}>
          <Folders size={16} />
        </Button>
      </div>
      <DragDropContext
        onBeforeCapture={(e) => {
          setDragging(e.draggableId);
        }}
        onBeforeDragStart={(e) => { }}
        onDragUpdate={(e) => {
          if (e.destination?.droppableId === "trash") {
            setIsHoveringTrash(true);
          } else {
            setIsHoveringTrash(false);
          }
        }}
        onDragEnd={(e) => {
          setIsHoveringTrash(false);
          if (e.destination?.droppableId === "trash") {
            const tn = trashNote.bind(null, { id: e.draggableId });
            setDragging(null);
            return tn();
          }
          if (e.draggableId.startsWith("trash")) {
            const rn = restoreNote.bind(null, {
              id: e.draggableId.split("*")[1],
            });
            setDragging(null);
            return rn();
          }
          setDragging(null);
        }}
      >
        <ul className="flex flex-col gap-1">
          {folders.map((folder) => {
            return (
              <Droppable key={folder.id} droppableId={folder.id}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <li>
                      <Folder key={folder.id} folder={folder} notes={notes} />
                    </li>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
          {notes.length > 0 && (
            <Droppable droppableId="trash">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <li>
                    <Trash notes={notes} active={isHoveringTrash} />
                  </li>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
          <Droppable droppableId="root">
            {(filesDroppableProvider) => (
              <div
                {...filesDroppableProvider.droppableProps}
                ref={filesDroppableProvider.innerRef}
                className="flex flex-col gap-1"
              >
                {notes.map((note, i) => {
                  if (note.folder || note.trashed) {
                    return null;
                  }
                  return (
                    <Draggable key={note.id} draggableId={note.id} index={i}>
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Note dragging={dragging} key={note.id} note={note} />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {filesDroppableProvider.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>
    </>
  );
}
