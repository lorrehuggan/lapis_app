"use client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useState } from "react";

export default function UseTextEditor() {
  const [editable, setEditable] = useState(true);
  const [content, setContent] = useState<string>(`<h1>Editor</h1>`);

  const extensions = [StarterKit];

  const editor = useEditor({
    content,
    extensions,
    editable,
    autofocus: true,
    onCreate: () => {
      console.log("editor created");
    },
    onUpdate: ({ editor }) => {
      console.log("editor updated");
    },
    onDestroy: () => {
      console.log("editor destroyed");
    },
  });

  const editorClear = useCallback(() => {
    if (!editor) return;
    console.log("clearing editor");
    editor.commands.clearContent();
  }, [editor]);

  return {
    editor,
    editorClear,
  };
}
