"use client";
import UseTextEditor from "@/lib/hooks/useEditor";
import { EditorContent } from "@tiptap/react";

export default function TextEditor() {
  const { editor, editorClear } = UseTextEditor();

  return (
    <div className="">
      <button onClick={editorClear}>Clear</button>
      <EditorContent
        className="max-w-[784px] w-11/12 mx-auto prose prose-neutral"
        editor={editor}
      />
    </div>
  );
}
