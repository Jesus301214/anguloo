# =============================================
# ANGULO + n8n - Script de instalacion (PowerShell)
# =============================================
# Requisitos: Docker Desktop instalado
# Uso: .\n8n\scripts\setup.ps1

$ErrorActionPreference = "Stop"

Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "  ANGULO + n8n - Instalacion" -ForegroundColor Cyan
Write-Host "========================================"  -ForegroundColor Cyan
Write-Host ""

# Verificar Docker
$dockerVersion = docker --version 2>$null
if (-not $dockerVersion) {
    Write-Host "ERROR: Docker no esta instalado." -ForegroundColor Red
    Write-Host "Instala Docker Desktop: https://www.docker.com/products/docker-desktop"
    exit 1
}

# Crear .env de n8n si no existe
if (-not (Test-Path -LiteralPath "n8n\.env")) {
    Write-Host "Creando archivo .env para n8n..." -ForegroundColor Yellow
    $envContent = @"
N8N_ENCRYPTION_KEY=angulo-change-me-32chars-!!
NGROK_AUTHTOKEN=
"@
    Set-Content -LiteralPath "n8n\.env" -Value $envContent
}

# Iniciar n8n
Write-Host ""
Write-Host "Iniciando n8n con Docker..." -ForegroundColor Green
Set-Location n8n
docker compose up -d
Set-Location ..

Write-Host ""
Write-Host "========================================"  -ForegroundColor Cyan
Write-Host "  n8n iniciado! http://localhost:5678" -ForegroundColor Green
Write-Host "========================================"  -ForegroundColor Cyan
Write-Host ""
Write-Host "Siguientes pasos:" -ForegroundColor Yellow
Write-Host "1. Abre http://localhost:5678 en tu navegador"
Write-Host "2. Crea una cuenta de administrador"
Write-Host "3. Ve a Settings -> Credentials y agrega:"
Write-Host "   - Supabase API"
Write-Host "   - WhatsApp Business API (opcional)"
Write-Host "4. Importa los workflows de n8n/workflows/"
Write-Host "5. Configura y activa cada workflow"
