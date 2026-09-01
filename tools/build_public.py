from pathlib import Path
import shutil,re,json
SRC=Path(__file__).resolve().parents[1]
OUT=SRC.parent/'soliss-p0-decision-room-v4.1-public'
if OUT.exists(): shutil.rmtree(OUT)
shutil.copytree(SRC,OUT,ignore=shutil.ignore_patterns('documents','tools','RESEARCH_SOURCES.md'))
# Empty public document metadata to keep runtime code stable; Document Center is hidden.
(OUT/'assets'/'documents.js').write_text('window.P0_DOCUMENTS={"groups":[],"pack":{"path":"#","fileCount":0,"size":"No público","sha256":""},"manifest":{"json":"#","txt":"#"}};\n',encoding='utf-8')
# Remove exact economics from data source while preserving structure.
p=OUT/'assets'/'data.js';s=p.read_text(encoding='utf-8')
s=re.sub(r'(build:\s*)105786\.20',r'\g<1>0',s);s=re.sub(r'(service:\s*)77000',r'\g<1>0',s);s=re.sub(r'(base24:\s*)182786\.20',r'\g<1>0',s);s=re.sub(r'(optional:\s*)42000',r'\g<1>0',s);s=re.sub(r'(adjustment:\s*)-338\.80',r'\g<1>0',s)
s=re.sub(r'rate:\s*\d+(?:\.\d+)?', 'rate:0', s);s=re.sub(r'cost:\s*\d+(?:\.\d+)?', 'cost:0', s)
s=re.sub(r'low:\s*\d+', 'low:0', s);s=re.sub(r'high:\s*\d+', 'high:0', s)
# Replace infra block monetary vectors with zeros in the economics source only.
s=re.sub(r'(\["[^\n]+?",\s*"[^\n]+?",)\d+,(\d+),(\d+)(\])',lambda m:m.group(1)+'0,0,0'+m.group(4),s)
p.write_text(s,encoding='utf-8')
# Sanitise hard-coded price display and mark public build.
i=OUT/'index.html';h=i.read_text(encoding='utf-8').replace('data-build="boardroom"','data-build="public"')
for old,new in [('105.786,20 €','Disponible en Boardroom'),('77.000 €','Disponible en Boardroom'),('182.786,20 €','Disponible en Boardroom'),('180–280 k€*','Sizing en G2'),('180–280 k€','Sizing en G2'),('+42.000 €','opcional')]:h=h.replace(old,new)
# Remove exact-cost sentences where practical.
h=h.replace('955 h + ajuste comercial −338,80 €.','Baseline disponible en la versión Boardroom.')
i.write_text(h,encoding='utf-8')
# Hide sensitive boardroom modules but retain generic architecture/research.
c=OUT/'assets'/'styles.css';cs=c.read_text(encoding='utf-8')+'\nbody[data-build="public"] #economics,body[data-build="public"] #documents,body[data-build="public"] .meeting-tools,body[data-build="public"] .integrity-panel,body[data-build="public"] .changelog{display:none!important}\n';c.write_text(cs,encoding='utf-8')
# Sanitize README economics as well.
r=OUT/'README.md';rt=r.read_text(encoding='utf-8')
rt=rt.replace('- Construcción P0 F0–F4: **105.786,20 €**.','- Construcción P0 F0–F4: **detalle disponible en Boardroom**.').replace('- Servicio co-gestionado M3–M24: **77.000 €**.','- Servicio co-gestionado M3–M24: **detalle disponible en Boardroom**.').replace('- Total Keedio M1–M24: **182.786,20 €**.','- Total Keedio M1–M24: **detalle disponible en Boardroom**.').replace('- Año opcional M25–M36: **42.000 €**.','- Año opcional M25–M36: **detalle disponible en Boardroom**.').replace('La web no suma de nuevo 20.000 € de activación sobre 105.786,20 €, porque F0 ya forma parte del total de construcción Final Cerrado.','La build pública no expone el detalle económico; la reconciliación del baseline se conserva únicamente en Boardroom.')
r.write_text(rt,encoding='utf-8')
(OUT/'robots.txt').write_text('User-agent: *\nAllow: /\n',encoding='utf-8')
# Disable service worker pre-existing cache name collision.
sw=OUT/'sw.js';st=sw.read_text(encoding='utf-8').replace("soliss-p0-v4-boardroom","soliss-p0-v4-1-public");sw.write_text(st,encoding='utf-8')
print(OUT)
