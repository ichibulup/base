import type { SupabaseClientOptions } from '@supabase/supabase-js'
import { DatabaseSchema, DefaultSchema } from "@/lib/interface"
import { createBrowserClient, createServerClient, type CookieMethodsServer } from "@supabase/ssr";

export type CommonCookieMethods = Pick<CookieMethodsServer, 'getAll' | 'setAll'>

export function createServer<
  Database = any,
  SchemaName extends DatabaseSchema<Database> = DefaultSchema<Database>,
>(
  url: string,
  publishableKey: string,
  cookies: CommonCookieMethods,
  options?: SupabaseClientOptions<SchemaName>
) {
  return createServerClient<Database, SchemaName>(
    url,
    publishableKey,
    {
      ...options,
      cookies: {
        getAll() {
          return cookies.getAll();
        },
        setAll(cookiesToSet) {
          try {
            // @ts-ignore
            cookies.setAll(cookiesToSet);
            // cookiesToSet.forEach(({ name, value, options }) =>
            //   cookies.set(name, value, options)
            // )
          } catch {
          }
        },
      },
    }
  );
}