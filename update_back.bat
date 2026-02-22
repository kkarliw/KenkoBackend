@echo off
set GIT_PATH=C:\Users\Karla\AppData\Local\Programs\Git\cmd\git.exe
echo Inicianco actualizacion de Backend...
"%GIT_PATH%" init
"%GIT_PATH%" remote remove origin
"%GIT_PATH%" remote add origin https://github.com/kkarliw/KenkoBackend.git
"%GIT_PATH%" add .
"%GIT_PATH%" commit -m "Actualizacion Backend - cambios back"
"%GIT_PATH%" branch -M main
"%GIT_PATH%" push -u origin main
echo Finalizado.
