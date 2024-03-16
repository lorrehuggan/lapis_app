import type { Editor } from "@tiptap/react";

export function clearEditor(editor: Editor | null): void {
  if (!editor) return;
  editor.chain().focus().clearContent().run();
  return;
}

export function saveDocument(editor: Editor | null): void {
  if (!editor) return;
  const content = editor.getJSON();
  console.log(JSON.stringify(content));
  return;
}

export function toggleZettel(editor: Editor | null): void {
  if (!editor) return;
  editor.chain().focus().toggleMark("zettel").run();
  return;
}
