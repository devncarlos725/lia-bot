import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/src/types/base-de-datos'

export type ClienteSupabase = SupabaseClient<Database>
