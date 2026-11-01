"""Local-only QA origin; instrumentation is never injected in the published app."""
import argparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--port', type=int, default=4175)
args = parser.parse_args()

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(root), **kw)

    def do_GET(self):
        if urlparse(self.path).path in ['/', '/index.html']:
            source = (root / 'index.html').read_text().replace('<head>', '<head><script src="./scripts/qa-observer.js"></script>', 1)
            data = source.encode()
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        else:
            super().do_GET()

    def log_message(self, fmt, *args):
        if len(args) > 1 and str(args[1]) not in ['200', '304']:
            super().log_message(fmt, *args)

ThreadingHTTPServer(('127.0.0.1', args.port), Handler).serve_forever()
