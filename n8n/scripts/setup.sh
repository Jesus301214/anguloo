#!/usr/bin/env bash
# =============================================
# ANGULO + n8n - Script de instalacion rapida
# =============================================
# Requisitos: Docker y Docker Compose instalados
# Uso: ./n8n/scripts/setup.sh

set -e

echo "========================================"
echo "  ANGULO + n8n - Instalacion"
echo "========================================"
echo ""

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "ERROR: Docker no esta instalado."
    echo "Instala Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "ERROR: Docker Compose no esta instalado."
    exit 1
fi

# Crear directorios
mkdir -p n8n/workflows
mkdir -p n8n/scripts

# Verificar .env de n8n
cd n8n
if [ ! -f .env ]; then
    echo "Creando archivo .env para n8n..."
    cat > .env << 'EOF'
N8N_ENCRYPTION_KEY=$(openssl rand -hex 16 2>/dev/null || echo "angulo-change-me-32chars!!")
NGROK_AUTHTOKEN=
EOF
    echo "Archivo .env creado. Editalo para agregar tu NGROK_AUTHTOKEN (opcional)."
fi

# Iniciar n8n
echo ""
echo "Iniciando n8n con Docker..."
docker compose up -d

echo ""
echo "========================================"
echo "  n8n iniciado! http://localhost:5678"
echo "========================================"
echo ""
echo "Siguientes pasos:"
echo "1. Abre http://localhost:5678 en tu navegador"
echo "2. Crea una cuenta de administrador"
echo "3. Ve a Settings -> Credentials y agrega:"
echo "   - Supabase API (URL + Anon Key)"
echo "   - WhatsApp Business API (opcional)"
echo "   - Google Sheets OAuth (opcional)"
echo "4. Ve a Workflows -> Import from File"
echo "5. Importa los workflows de la carpeta n8n/workflows/"
echo "6. Configura las credenciales en cada workflow"
echo "7. Activalos!"
echo ""
echo "Para exponer n8n a internet (necesario para WhatsApp):"
echo "  - Opcion A: Agrega NGROK_AUTHTOKEN en .env y ejecuta:"
echo "    docker compose --profile ngrok up -d"
echo "  - Opcion B: Usa un dominio propio con SSL"
echo ""
echo "Para detener: docker compose down"
