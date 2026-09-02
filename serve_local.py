from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

ROOT=Path(__file__).resolve().parent
os.chdir(ROOT)

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        path = self.translate_path(self.path)
        if path.endswith(('.html', '.js', '.css', '.json', '.png', '.svg', '.ico', '.webmanifest')):
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

url="http://127.0.0.1:8000/?view=public"
print("Soliss AI/RPA Factory V6.2")
print("Public:",url)
print("Boardroom local demo: http://127.0.0.1:8000/?view=boardroom")
print("Ctrl+C para detener.")
ThreadingHTTPServer(("127.0.0.1",8000), NoCacheHandler).serve_forever()
