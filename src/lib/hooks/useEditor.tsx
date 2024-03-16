"use client";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import Zettel from "../editor/extensions/zettle/mark";

export default function UseTextEditor() {
  const [editable, setEditable] = useState(true);
  const [content, setContent] = useState<string>(`<h1>Editor</h1>`);

  const extensions = [StarterKit, Zettel];

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

  return {
    editor,
    setEditable,
    setContent,
  };
}
