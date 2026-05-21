const requiredVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
]

const optionalVars = ['VITE_ZAPIER_WEBHOOK_URL', 'VITE_N8N_WEBHOOK_URL', 'VITE_GEMINI_API_KEY']

export function validateEnv() {
  const missing = []

  if (!import.meta.env.VITE_SUPABASE_URL) missing.push('VITE_SUPABASE_URL')
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) missing.push('VITE_SUPABASE_ANON_KEY')

  if (missing.length > 0) {
    const message = `Faltan variables de entorno requeridas: ${missing.join(', ')}. Revisa tu archivo .env`
    console.error(message)
    if (import.meta.env.DEV) {
      throw new Error(message)
    }
  }

  if (!import.meta.env.VITE_GEMINI_API_KEY) console.warn('VITE_GEMINI_API_KEY no configurada (opcional)')
  if (!import.meta.env.VITE_ZAPIER_WEBHOOK_URL) console.warn('VITE_ZAPIER_WEBHOOK_URL no configurada (opcional)')
  if (!import.meta.env.VITE_N8N_WEBHOOK_URL) console.warn('VITE_N8N_WEBHOOK_URL no configurada (opcional)')
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
