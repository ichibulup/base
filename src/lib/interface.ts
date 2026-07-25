import type { CookieMethodsServer } from "@supabase/ssr";

export type DatabaseSchema<T> = string & keyof Omit<T, '__InternalSupabase'>;
export type DefaultSchema<T> = 'public' extends DatabaseSchema<T>
  ? 'public'
  : DatabaseSchema<T>;

