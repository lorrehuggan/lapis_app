import { Mark, markInputRule, markPasteRule } from "@tiptap/react";

const inputRegex = /(\[\[([^\]]+)\]\])/g;

type ZettelOptions = {
  HTMLAttributes: Record<string, string>;
};

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    zettel: {
      setZettel: () => ReturnType;
      toggleZettel: () => ReturnType;
      unsetZettel: () => ReturnType;
    };
  }
}

const ZettelExtension = Mark.create<ZettelOptions>({
  name: "zettel",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addPasteRules() {
    return [
      markPasteRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  addCommands() {
    return {
      setZettel:
        () =>
          ({ commands }) => {
            return commands.setMark("zettel");
          },
      toggleZettel:
        () =>
          ({ commands }) => {
            return commands.toggleMark("zettel");
          },
      unsetZettel:
        () =>
          ({ commands }) => {
            return commands.unsetMark("zettel");
          },
    };
  },

  renderHTML({ HTMLAttributes, mark }) {
    return ["a", { ...HTMLAttributes, "data-type": "zettel" }, 0];
  },

  parseHTML() {
    return [
      {
        tag: 'a[data-type="zettel"]',
        mark: this.name,
      },
    ];
  },
});

export default ZettelExtension;
