#!/bin/bash

# =============================================================================
# RED SOLUCIONES - SCRIPT DE INICIO
# =============================================================================
# 
# Este script verifica que todo esté configurado correctamente antes de iniciar
# el servidor.
#
# Uso: ./start.sh
# =============================================================================

echo ""
echo "🚀 =============================================="
echo "   RED SOLUCIONES - GOOGLE SHEETS BACKEND"
echo "=============================================="
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "   Instala Node.js desde: https://nodejs.org/"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

# Verificar que existan los archivos necesarios
if [ ! -f ".env" ]; then
    echo "❌ Error: Archivo .env no encontrado"
    echo "   Asegúrate de tener el archivo .env configurado"
    exit 1
fi

if [ ! -f "credentials.json" ]; then
    echo "❌ Error: Archivo credentials.json no encontrado"
    echo "   Asegúrate de tener las credenciales de Google configuradas"
    exit 1
fi

if [ ! -f "package.json" ]; then
    echo "❌ Error: Archivo package.json no encontrado"
    exit 1
fi

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar que el puerto no esté en uso
PORT=$(grep PORT .env | cut -d '=' -f2)
PORT=${PORT:-3001}

if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Advertencia: El puerto $PORT está en uso"
    echo "   El servidor intentará usar el puerto $PORT de todas formas"
    echo ""
fi

echo "✅ Verificaciones completadas"
echo "🌐 Puerto configurado: $PORT"
echo "📊 Iniciando servidor..."
echo ""

# Iniciar el servidor
npm start
