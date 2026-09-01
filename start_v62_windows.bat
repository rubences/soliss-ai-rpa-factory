@echo off
cd /d "%~dp0"
echo Soliss AI/RPA Factory V6.2
echo Public: http://127.0.0.1:8000/?view=public
echo Boardroom: http://127.0.0.1:8000/?view=boardroom
echo Credenciales Boardroom: soliss / soliss
python -m http.server 8000 --bind 127.0.0.1
pause
