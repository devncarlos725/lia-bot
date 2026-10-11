export function obtenerVariablesSupabase() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const clave = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  
    if (!url || !clave) {
      throw new Error(
        'Faltan las variables de entorno NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.'
      )
    }
  
    return { url, clave }
  }