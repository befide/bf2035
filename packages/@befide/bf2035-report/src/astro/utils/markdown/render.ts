import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function renderInline(source: string | undefined) {
  if (!source) return source;
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(source),
  );

  return html.replace("<p>", "").replace("</p>", "").replace(" @@ ", "&nbsp;");
}
