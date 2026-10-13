import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const port = Number(process.env.PORT || 5173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
const server = createServer(async (request, response) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  try {
    const path = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (!(path === '/' || path === '/index.html' || path.startsWith('/assets/')) ||
        path.includes('\\') || path.split('/').some(segment => segment.startsWith('.'))) {
      response.writeHead(404).end();
      return;
    }
    const file = await realpath(resolve(root, path === '/' ? 'index.html' : path.slice(1)));
    if (!file.startsWith(root + sep) || !(await stat(file)).isFile()) {
      response.writeHead(404).end();
      return;
    }
    const content = await readFile(file);
    response.writeHead(200, {
      'Content-Type': `${types[extname(file)] || 'application/octet-stream'}; charset=utf-8`,
      'Content-Length': content.length,
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    response.writeHead(error instanceof URIError ? 400 : 404).end();
  }
});
server.on('error', error => {
  console.error(`Preview could not start: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => {
  console.log(`Trolley preview: http://127.0.0.1:${port}`);
  console.log('Keep this terminal open. Press Ctrl+C to stop.');
});
