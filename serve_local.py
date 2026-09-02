from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os
ROOT=Path(__file__).resolve().parent
os.chdir(ROOT)
print("Soliss AI/RPA Factory V7")
print("Public: http://127.0.0.1:8000/?view=public")
print("Boardroom: http://127.0.0.1:8000/?view=boardroom")
print("Licitación: http://127.0.0.1:8000/?view=tender")
print("Credenciales demo reservadas: soliss / soliss")
ThreadingHTTPServer(("127.0.0.1",8000),SimpleHTTPRequestHandler).serve_forever()
