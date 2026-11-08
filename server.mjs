import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.jpeg':'image/jpeg','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let target = path.resolve(root,'.'+pathname);
    if (!target.startsWith(root+path.sep) && target!==root) {res.writeHead(403);res.end();return;}
    if ((await stat(target)).isDirectory()) target=path.join(target,'index.html');
    const body = await readFile(target);
    res.writeHead(200, {'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(body);
  } catch {res.writeHead(404,{'Content-Type':'text/plain'});res.end('Page not found');}
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/design.html'));
