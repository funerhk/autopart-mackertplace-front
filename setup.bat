@echo off
REM Setup script para desarrollo local en Windows

setlocal enabledelayedexpansion

echo 🚀 Autoparts Marketplace Frontend Setup
echo ========================================

REM Verificar Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js version: !NODE_VERSION!

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm version: !NPM_VERSION!

REM Instalar dependencias
echo.
echo 📦 Instalando dependencias...
call npm install

REM Setup web app
echo.
echo 🌐 Configurando web app...
cd apps\web
call npm install

if not exist .env (
    echo 📝 Creando .env...
    copy .env.example .env
)

cd ..\..

REM Setup mobile app
echo.
echo 📱 Configurando mobile app...
cd apps\mobile
call npm install

if not exist .env (
    echo 📝 Creando .env...
    copy .env.example .env
)

cd ..\..

echo.
echo ✅ Setup completado
echo.
echo Próximos pasos:
echo.
echo 1. Desarrollar web:
echo    npm run dev:web
echo.
echo 2. Desarrollar mobile:
echo    npm run dev:mobile
echo.
echo 3. Lint:
echo    npm run lint:web
echo.
echo 4. Build:
echo    npm run build:web
