import { readFile } from 'node:fs/promises';

const dictionary = JSON.parse(await readFile(new URL('./translations/pt.json', import.meta.url), 'utf8'));
const decode = value => value.replace(/&amp;|&quot;|&#39;|&lt;|&gt;|&#(\d+);/g, (entity, code) => code ? String.fromCodePoint(Number(code)) : ({ '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' }[entity]));
const escape = value => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));

function translate(value) {
  const decoded = decode(value);
  const key = decoded.trim();
  if (!key || !/\p{L}/u.test(key)) return value;
  if (!Object.hasOwn(dictionary, key)) throw new Error(`Portuguese translation missing: ${key}`);
  return escape(decoded.replace(key, dictionary[key]));
}

export function portuguesePage(html, file, origin) {
  const url = `${origin}/pt/${file}`;
  const translated = html.replace(/(<script\b[^>]*>[\s\S]*?<\/script>)|(<[^>]+>)|([^<]+)/g, (token, script, tag, text) => {
    if (script) return script.replace(/src="((?:app|language)\.js[^"]*)"/, 'src="../$1"');
    if (text) return translate(text);
    let result = tag.replace(/\b(alt|aria-label|placeholder|title|data-label)="([^"]*)"/g, (_, attribute, value) => `${attribute}="${translate(value)}"`);
    if (result.startsWith('<html ')) result = result.replace('lang="en"', 'lang="pt-AO"');
    if (/^<meta\b/.test(result)) {
      if (/(?:name="description"|property="og:(?:title|description)")/.test(result)) {
        result = result.replace(/content="([^"]*)"/, (_, value) => `content="${translate(value)}"`);
      }
      if (result.includes('property="og:locale"')) result = result.replace('en_GB', 'pt_AO');
      if (result.includes('property="og:url"')) result = result.replace(/content="[^"]*"/, `content="${url}"`);
    }
    if (result.includes('rel="canonical"')) result = result.replace(/href="[^"]*"/, `href="${url}"`);
    if (result.includes('data-language="en"')) result = result.replace(/href="[^"]*"/, `href="../${file}"`).replace(' aria-current="true"', '');
    if (result.includes('data-language="pt"')) result = result.replace(/href="[^"]*"/, `href="${file}"`).replace('hreflang="pt-AO"', 'hreflang="pt-AO" aria-current="true"');
    result = result.replace(/\b(src|href)="((?:assets\/|styles\.css|app\.js|favicon\.svg)[^"]*)"/g, (_, attribute, path) => `${attribute}="../${path}"`);
    return result;
  });
  return translated.replace(/<br>\s*<\/h1>/g, '</h1>');
}
