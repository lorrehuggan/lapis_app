import { JSONContent } from "@tiptap/react";

export function getZettelLinks(
  content: JSONContent[] | undefined,
  links: string[] = [],
): string[] {
  if (!content) return [];
  content.forEach((node) => {
    if (node.type === "text" && node.text && node.marks) {
      // Check if the text node has a zettel-link mark
      const hasZettelLink = node.marks.some((mark) => mark.type === "zettel");
      if (hasZettelLink) {
        // If it does, add the text to the links array
        links.push(node.text);
      }
    } else if (node.content) {
      // If the node has more content, recursively process each child node
      getZettelLinks(node.content, links);
    }
  });

  return links;
}

export function getTitle(content: JSONContent[] | undefined): string | null {
  if (!content) return null;
  for (const node of content) {
    if (node.type === "heading" && node.attrs && node.attrs.level === 1) {
      // Assuming the heading contains text in its content array
      const headingText = node.content
        ?.map((textNode) => textNode.text)
        .join("");
      return headingText || null;
    }
  }
  return null; // Return null if no level 1 heading is found
}
