import type { SupabaseClientOptions } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import { DatabaseSchema, DefaultSchema } from "@/lib/interface"

export function createNextClient<
  Database = any,
  SchemaName extends DatabaseSchema<Database> = DefaultSchema<Database>,
>(
  url: string,
  publishableKey: string,
  options?: SupabaseClientOptions<SchemaName>
) {
  return createBrowserClient<Database, SchemaName>(
    url,
    publishableKey,
    options
  )
}