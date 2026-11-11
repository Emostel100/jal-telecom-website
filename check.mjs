import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist');
const files=(await readdir(root)).filter(f=>f.endsWith('.html'));
let references=0;
for(const file of files){
 const html=await readFile(path.join(root,file),'utf8');
 assert.match(html,/<html lang="en">/,`${file}: language`);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${file}: one main heading`);
 assert.match(html,/<main id="main">/,`${file}: main landmark`);
 assert.match(html,/<title>[^<]+<\/title>/,`${file}: title`);
 assert.match(html,/name="description" content="[^"]+"/,`${file}: description`);
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(ids).size,ids.length,`${file}: duplicate IDs`);
 for(const tag of html.matchAll(/<img\b[^>]*>/g))assert.match(tag[0],/\balt="[^"]*"/,`${file}: image alternative text`);
 for(const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
  const ref=match[1].replaceAll('&amp;','&');
  if(/^(https?:|mailto:|tel:|data:)/.test(ref))continue;
  const [pathname,fragment]=ref.split('#');
  const target=pathname.split('?')[0]||file;
  const absolute=path.resolve(root,target);
  assert.ok(absolute.startsWith(root+path.sep),`${file}: unsafe path ${ref}`);
  assert.ok((await stat(absolute)).isFile(),`${file}: missing ${ref}`);
  if(fragment&&target.endsWith('.html')){
   const linked=target===file?html:await readFile(absolute,'utf8');
   assert.ok(linked.includes(`id="${fragment}"`),`${file}: missing anchor ${ref}`);
  }
  references++;
 }
 const structured=[...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
 for(const m of structured)JSON.parse(m[1]);
}
assert.equal(files.length,21,'20 content pages plus 404');
const app=await readFile('app.js','utf8');
assert.ok(!/localStorage|sessionStorage|fetch\(/.test(app),'enquiries must stay on device until an external send action');
console.log(`PASS: ${files.length} HTML pages, ${references} local references, anchors, image alternatives, unique IDs, metadata and structured data.`);
