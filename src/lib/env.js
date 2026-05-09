const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_GOOGLE_CLIENT_ID',
  'VITE_GEMINI_API_KEY',
]

const optionalVars = ['VITE_ZAPIER_WEBHOOK_URL', 'VITE_N8N_WEBHOOK_URL']

export function validateEnv() {
  const missing = []

  for (const key of requiredVars) {
    if (!import.meta.env[key]) {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    const message = `Faltan variables de entorno requeridas: ${missing.join(', ')}. Revisa tu archivo .env`
    console.error(message)
    if (import.meta.env.DEV) {
      throw new Error(message)
    }
  }

  const missingOptional = []
  for (const key of optionalVars) {
    if (!import.meta.env[key]) {
      missingOptional.push(key)
    }
  }

  if (missingOptional.length > 0) {
    console.warn(`Variables de entorno opcionales no configuradas: ${missingOptional.join(', ')}`)
  }
}

export const logger = {
  error: (context, err) => {
    if (import.meta.env.DEV) {
      console.error(`[${context}]`, err)
    }
  },
  warn: (context, msg) => {
    if (import.meta.env.DEV) {
      console.warn(`[${context}]`, msg)
    }
  },
}
