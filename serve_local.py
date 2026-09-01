from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os, webbrowser

ROOT=Path(__file__).resolve().parent
os.chdir(ROOT)
url="http://127.0.0.1:8000/?view=public"
print("Soliss AI/RPA Factory V6.2")
print("Public:",url)
print("Boardroom local demo: http://127.0.0.1:8000/?view=boardroom")
print("Ctrl+C para detener.")
ThreadingHTTPServer(("127.0.0.1",8000),SimpleHTTPRequestHandler).serve_forever()
