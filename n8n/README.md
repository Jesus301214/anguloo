# ANGULO + n8n - Automatizaciones Inteligentes

## Que es n8n?

n8n es un plataforma de automatizacion **open-source y gratuita** (alternativa a Zapier). 
Permite conectar 400+ servicios mediante workflows visuales. Se auto-hospeda en tu propio servidor.

## Instalacion Rapida (1 minuto)

```bash
# En Windows PowerShell:
.\n8n\scripts\setup.ps1

# En Mac/Linux:
bash n8n/scripts/setup.sh
```

Luego abre http://localhost:5678, crea tu cuenta y importa los workflows.

---

## Workflows Incluidos

### 1. Clasificador de Leads con IA
**Archivo:** `n8n/workflows/leads-classifier.json`

Cuando un lead entra por el formulario de la landing page, n8n:
1. Recibe los datos via webhook
2. Los analiza con Gemini IA (score 1-10, categoria, insight)
3. Actualiza el lead en Supabase con los resultados
4. Retorna la clasificacion al frontend

**Como activarlo:**
- Agrega la URL del webhook en tu LandingPage como `N8N_LEADS_WEBHOOK_URL`
- O llama desde el codigo: `fetch('http://localhost:5678/webhook/angulo-lead-webhook', ...)`

### 2. Recordatorios WhatsApp de Citas
**Archivo:** `n8n/workflows/whatsapp-reminders.json`

Cada hora, n8n:
1. Busca reuniones programadas para la proxima hora
2. Verifica que el lead tenga WhatsApp
3. Envia un mensaje de recordatorio automatizado

**Requisitos:** WhatsApp Business API configurada en n8n

### 3. Reporte Diario al Admin
**Archivo:** `n8n/workflows/daily-report.json`

Todos los dias a las 8:00 AM, n8n:
1. Consulta estadisticas de leads y reuniones en Supabase
2. Genera un resumen formateado
3. Lo envia por WhatsApp al administrador

**Requisitos:** Variable `ADMIN_WHATSAPP` configurada

### 4. Enriquecimiento de Leads con IA
**Archivo:** `n8n/workflows/lead-enrichment.json`

Cada 12 horas, n8n:
1. Busca leads nuevos sin procesar
2. Investiga cada empresa con Gemini IA
3. Agrega datos de sector, tamano y necesidades

### 5. WhatsApp Chatbot de Soporte
**Archivo:** `n8n/workflows/whatsapp-chatbot.json`

Responde automaticamente mensajes de WhatsApp:
1. Recibe el mensaje del cliente
2. Lo procesa con Gemini IA
3. Responde con informacion util sobre ANGULO

**Requisitos:** WhatsApp Business API + ngrok o dominio publico

### 6. Respaldo a Google Sheets
**Archivo:** `n8n/workflows/backup-sheets.json`

Cada 6 horas sincroniza los leads de Supabase a Google Sheets como respaldo.

---

## Credenciales Necesarias en n8n

| Credencial | Donde obtenerla | Workflows que la usan |
|-----------|----------------|----------------------|
| Supabase API | Supabase Dashboard -> Settings -> API | Todos |
| WhatsApp Business API | Meta for Developers | Recordatorios, Chatbot, Reportes |
| Google Sheets OAuth | Google Cloud Console | Respaldo Sheets |
| Gemini API Key | Google AI Studio | Clasificador, Chatbot, Enriquecimiento |

---

## Variables de Entorno en n8n

Agrega estas en Settings -> Environment Variables:

```env
VITE_GEMINI_API_KEY=tu-key-de-gemini
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
ADMIN_WHATSAPP=584249313359
WHATSAPP_PHONE_ID=477115632141067
GOOGLE_SHEET_ID=tu-sheet-id
```

---

## Integracion con el Codigo ANGULO

El LandingPage ya esta preparado para enviar leads a n8n. Cuando configures el webhook:

1. Importa el workflow `leads-classifier.json` en n8n
2. Copia la URL del webhook generada (Production URL)
3. Actualiza `VITE_ZAPIER_WEBHOOK_URL` en tu `.env` o crea `VITE_N8N_WEBHOOK_URL`
4. Los leads se enviaran automaticamente a n8n para clasificacion

---

## Arquitectura

```
┌─────────────────────────────────────────────────┐
│                    ANGULO                        │
│  ┌──────────┐   ┌──────────┐   ┌────────────┐  │
│  │Landing   │   │  Admin   │   │  Supabase  │  │
│  │Page      │   │  Panel   │   │  DB        │  │
│  └────┬─────┘   └──────────┘   └─────┬──────┘  │
│       │                              │          │
└───────┼──────────────────────────────┼──────────┘
        │ webhook                      │ API
        ▼                              ▼
┌─────────────────────────────────────────────────┐
│                      n8n                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │Lead      │ │WhatsApp  │ │Reportes          │ │
│  │Classifier│ │Reminders │ │Diarios           │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │Lead      │ │WhatsApp  │ │Backup            │ │
│  │Enrichment│ │Chatbot   │ │Google Sheets     │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
└─────────────────────────────────────────────────┘
        │                │
        ▼                ▼
┌──────────┐    ┌──────────────┐
│  Gemini  │    │  WhatsApp    │
│  AI      │    │  Business    │
└──────────┘    └──────────────┘
```
