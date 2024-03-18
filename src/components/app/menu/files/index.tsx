"use client";

import Folder from "@/components/app/menu/files/folder";
import Note from "@/components/app/menu/files/note";
import { restoreNote, trashNote, updateNoteFolder } from "@/lib/actions/editor";
import type {
  Folder as FolderType,
  Note as NoteType,
} from "@/lib/db/schema/note";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import Trash from "./trash";

type Props = {
  notes: NoteType[];
  folders: FolderType[];
};

export default function Files({ notes, folders }: Props) {
  return (
    <DragDropContext
      onDragEnd={(e) => {
        console.log(e);
        if (e.destination?.droppableId === "trash") {
          const tn = trashNote.bind(null, { id: e.draggableId });
          return tn();
        }
        if (e.draggableId.startsWith("trash")) {
          const rn = restoreNote.bind(null, {
            id: e.draggableId.split("*")[1],
          });
          return rn();
        }
        const uf = updateNoteFolder.bind(null, {
          noteId: e.draggableId,
          folderId: e.destination?.droppableId || null,
        });
        uf();
      }}
    >
      <Droppable droppableId="files">
        {(filesDroppableProvider) => (
          <div
            {...filesDroppableProvider.droppableProps}
            ref={filesDroppableProvider.innerRef}
          >
            <ul className="flex flex-col gap-1">
              <Droppable droppableId="trash">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <li>
                      <Trash notes={notes} />
                    </li>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              {folders.map((folder) => {
                return (
                  <Droppable key={folder.id} droppableId={folder.id}>
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <li>
                          <Folder
                            key={folder.id}
                            folder={folder}
                            notes={notes}
                          />
                        </li>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                );
              })}
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
                        <Note key={note.id} note={note} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {filesDroppableProvider.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
