"use client";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { saveNote } from "@/lib/actions/editor";
import { toggleZettel } from "@/lib/editor/commands";
import ZettelExtension from "@/lib/editor/extensions/zettle/mark";
import { getZettelLinks } from "@/lib/editor/helpers";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import Typography from "@tiptap/extension-typography";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ChevronRight, FileSymlink, Folders, Home, Save } from "lucide-react";

type Props = {
  note?: JSONContent;
  id?: string;
  user: string;
};

const CustomDocument = Document.extend({
  content: "heading block*",
});

export default function TextEditor({ note, id, user }: Props) {
  const editor = useEditor({
    content: note || "<h1>Hello World! 🌍</h1>",
    extensions: [
      StarterKit.configure({
        document: false,
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Title";
          }
          return "Start writing...";
        },
      }),
      Typography,
      ZettelExtension,
      CustomDocument,
    ],
    onCreate: () => {
      console.log("editor created");
    },
    onDestroy: () => {
      console.log("editor destroyed");
    },
    onUpdate: () => {
      console.log("editor updated");
    },
  });

  if (!editor) return null;

  const sn = saveNote.bind(null, {
    content: JSON.stringify(editor.getJSON()),
    description: "",
    folder: null,
    id: id ? id : null,
    user,
  });

  const doc = editor.getJSON();

  const zettels = getZettelLinks(doc.content);

  function slug() {
    return (
      note?.content?.[0]?.content?.[0]?.text
        ?.split(" ")
        .join("-")
        .toLowerCase() ?? "Untitled"
    );
  }

  return (
    <div className="h-full">
      <div className="h-8 flex items-center gap-2 px-8">
        <Breadcrumb className="font-mono text-xs tracking-tighter">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app">
                <Home size={16} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight size={16} />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app/editor">
                <Folders size={16} />
              </BreadcrumbLink>
            </BreadcrumbItem>
            {id && note?.content && (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight size={16} />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink className="pointer-events-none">
                    {slug()}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="max-w-[640px] mb-2 w-11/12 flex items-center gap-1 mx-auto">
        <>
          <Button onClick={() => toggleZettel(editor)} size="sm">
            <FileSymlink size={16} />
          </Button>
          <form action={sn}>
            <Button type="submit" size="sm">
              <Save size={16} />
            </Button>
          </form>
        </>
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
