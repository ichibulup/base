import { createBrowserClient, createServerClient } from '@supabase/ssr'
import type { CookieMethodsServer } from '@supabase/ssr'
import type { SupabaseClientOptions } from '@supabase/supabase-js'

export type CommonCookieMethods = Pick<CookieMethodsServer, 'getAll' | 'setAll'>

export function createCommonBrowserClient<
  Database = any,
  SchemaName extends string & keyof Omit<Database, '__InternalSupabase'> = 'public' extends keyof Omit<
    Database,
    '__InternalSupabase'
  >
    ? 'public'
    : string & keyof Omit<Database, '__InternalSupabase'>,
>(
  url: string,
  publishableKey: string,
  options?: SupabaseClientOptions<SchemaName>
) {
  return createBrowserClient<Database, SchemaName>(url, publishableKey, {
    ...(options ?? {}),
  })
}

export function createCommonServerClient<
  Database = any,
  SchemaName extends string & keyof Omit<Database, '__InternalSupabase'> = 'public' extends keyof Omit<
    Database,
    '__InternalSupabase'
  >
    ? 'public'
    : string & keyof Omit<Database, '__InternalSupabase'>,
>(
  url: string,
  publishableKey: string,
  cookies: CommonCookieMethods,
  options?: SupabaseClientOptions<SchemaName>
) {
  return createServerClient<Database, SchemaName>(url, publishableKey, {
    ...options,
    cookies: {
      getAll: cookies.getAll,
      setAll: (cookiesToSet) => {
        // @ts-ignore
        cookies.setAll?.(cookiesToSet)
      },
    },
  })
}
