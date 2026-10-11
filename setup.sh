#!/bin/bash

# Setup script para desarrollo local

set -e

echo "🚀 Autoparts Marketplace Frontend Setup"
echo "========================================"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
npm install

# Setup web app
echo ""
echo "🌐 Configurando web app..."
cd apps/web
npm install

# Crear .env
if [ ! -f .env ]; then
    echo "📝 Creando .env..."
    cp .env.example .env
fi

cd ../..

# Setup mobile app
echo ""
echo "📱 Configurando mobile app..."
cd apps/mobile
npm install

# Crear .env
if [ ! -f .env ]; then
    echo "📝 Creando .env..."
    cp .env.example .env
fi

cd ../..

echo ""
echo "✅ Setup completado"
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Desarrollar web:"
echo "   npm run dev:web"
echo ""
echo "2. Desarrollar mobile:"
echo "   npm run dev:mobile"
echo ""
echo "3. Lint:"
echo "   npm run lint:web"
echo ""
echo "4. Build:"
echo "   npm run build:web"
