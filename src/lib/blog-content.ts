export interface BlogHeading {
  id: string;
  level: 2 | 3;
  title: string;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, code: string) => decodeCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code: string) => decodeCodePoint(parseInt(code, 16)));
}

function decodeCodePoint(code: number): string {
  return Number.isInteger(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : '';
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function prepareBlogContent(content: string): { html: string; headings: BlogHeading[] } {
  const headings: BlogHeading[] = [];
  const usedIds = new Set<string>();
  let generatedId = 0;

  const html = content.replace(/<(h([23]))\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, tag: string, level: string, rawAttributes: string, inner: string) => {
    const title = decodeEntities(inner.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')).trim();
    if (!title) return match;

    const existingId = rawAttributes.match(/\bid\s*=\s*(["'])(.*?)\1/i)?.[2];
    let id = existingId ? decodeEntities(existingId) : '';
    if (!id || usedIds.has(id)) {
      do {
        generatedId += 1;
        id = `article-section-${generatedId}`;
      } while (usedIds.has(id));
    }

    usedIds.add(id);
    headings.push({ id, level: Number(level) as 2 | 3, title });

    const attributes = rawAttributes.replace(/\s+id\s*=\s*(["']).*?\1/i, '');
    return `<${tag}${attributes} id="${escapeAttribute(id)}">${inner}</${tag}>`;
  });

  return { html, headings };
}

export function estimateReadingMinutes(content: string): number {
  const plainText = decodeEntities(content.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  const wordCount = plainText ? plainText.split(' ').length : 0;

  return Math.max(1, Math.ceil(wordCount / 200));
}
