"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { saveNote } from "@/lib/actions/editor";
import { toggleZettel } from "@/lib/editor/commands";
import ZettelExtension from "@/lib/editor/extensions/zettle/mark";
import { getZettelLinks } from "@/lib/editor/helpers";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  note?: JSONContent;
  id?: string;
};

export default function TextEditor({ note, id }: Props) {
  const editor = useEditor({
    content: note || "<h1>Hello World! 🌍</h1>",
    extensions: [StarterKit, ZettelExtension],
  });

  if (!editor) return null;

  const sn = saveNote.bind(null, {
    content: JSON.stringify(editor.getJSON()),
    description: "",
    folder: null,
    id: id ? id : null,
  });

  const doc = editor.getJSON();

  const zettels = getZettelLinks(doc.content);

  return (
    <div className="px-4 h-full">
      <div className="h-8 flex items-center gap-2">
        <Button onClick={() => toggleZettel(editor)}>Zettel</Button>
        <form action={sn}>
          <Button type="submit">Save to Database</Button>
        </form>
      </div>
      <div className="max-w-[640px] w-11/12 flex items-center gap-1 mx-auto">
        {zettels.map((zettel) => {
          return (
            <Badge key={zettel} className="capitalize">
              {zettel}
            </Badge>
          );
        })}
      </div>
      <EditorContent
        className="max-w-[640px] overflow-y-scroll no-scrollbar max-h-[calc(100vh-2rem)] w-11/12 mx-auto prose prose-neutral h-full"
        editor={editor}
      />
    </div>
  );
}
