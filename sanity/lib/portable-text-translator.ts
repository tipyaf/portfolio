interface PortableTextSpan {
  _key: string;
  _type: 'span';
  text: string;
  marks?: string[];
}

interface PortableTextMarkDef {
  _key: string;
  _type: string;
  href?: string;
}

interface PortableTextBlock {
  _key: string;
  _type: 'block';
  style?: string;
  children: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
}

type AnyBlock = any;

export function blocksToHtml(blocks: AnyBlock[]): string {
  if (!blocks || blocks.length === 0) return '';

  return blocks
    .map((block: AnyBlock) => {
      if (block._type !== 'block') return '';
      const markDefs: PortableTextMarkDef[] = block.markDefs || [];

      const html = (block.children || [])
        .map((span: AnyBlock) => {
          let text: string = span.text || '';
          const marks: string[] = span.marks || [];

          marks.forEach((mark: string) => {
            const def = markDefs.find((d) => d._key === mark);
            if (def && def._type === 'link') {
              text = `<a href="${def.href}">${text}</a>`;
            } else if (mark === 'strong') {
              text = `<b>${text}</b>`;
            } else if (mark === 'em') {
              text = `<i>${text}</i>`;
            } else if (mark === 'underline') {
              text = `<u>${text}</u>`;
            }
          });

          return text;
        })
        .join('');

      return `<p>${html}</p>`;
    })
    .join('');
}

function generateKey(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function htmlToBlocks(html: string, sourceBlocks: AnyBlock[]): PortableTextBlock[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const paragraphs = doc.body.querySelectorAll('p');

  return Array.from(paragraphs).map((p, i) => {
    const sourceBlock = sourceBlocks[i];
    const markDefs: PortableTextMarkDef[] = [];
    const children: PortableTextSpan[] = [];

    function walkNode(node: Node, currentMarks: string[]) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        if (text) {
          children.push({
            _key: generateKey(),
            _type: 'span',
            text,
            marks: [...currentMarks],
          });
        }
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const el = node as Element;
      const tag = el.tagName.toLowerCase();

      let newMarks = [...currentMarks];

      if (tag === 'b' || tag === 'strong') {
        newMarks = [...newMarks, 'strong'];
      } else if (tag === 'i' || tag === 'em') {
        newMarks = [...newMarks, 'em'];
      } else if (tag === 'u') {
        newMarks = [...newMarks, 'underline'];
      } else if (tag === 'a') {
        const href = el.getAttribute('href');
        if (href) {
          const defKey = generateKey();
          markDefs.push({ _key: defKey, _type: 'link', href });
          newMarks = [...newMarks, defKey];
        }
      }

      el.childNodes.forEach((child) => walkNode(child, newMarks));
    }

    p.childNodes.forEach((child) => walkNode(child, []));

    return {
      _key: sourceBlock?._key || generateKey(),
      _type: 'block',
      style: sourceBlock?.style || 'normal',
      markDefs,
      children:
        children.length > 0
          ? children
          : [{ _key: generateKey(), _type: 'span', text: '', marks: [] }],
    };
  });
}
