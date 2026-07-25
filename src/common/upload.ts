import type { SupabaseClient } from '@supabase/supabase-js'

type SupabaseAnyClient = SupabaseClient<any, any, any>

type UploadInput = {
  bucket: string
  path: string
  fileBody: File | Blob | ArrayBuffer | ArrayBufferView | string
  options?: Record<string, unknown>
}

export type UploadUtils = {
  upload: (input: UploadInput) => Promise<any>
  upsert: (input: UploadInput) => Promise<any>
  remove: (bucket: string, paths: string[]) => Promise<any>
  getPublicUrl: (bucket: string, path: string) => { data: { publicUrl: string } }
  createSignedUrl: (bucket: string, path: string, expiresIn: number) => Promise<any>
}

export function createCommonUploadUtils(client: SupabaseAnyClient): UploadUtils {
  return {
    upload({ bucket, path, fileBody, options }: UploadInput) {
      return client.storage.from(bucket).upload(path, fileBody, options as any)
    },
    upsert({ bucket, path, fileBody, options }: UploadInput) {
      return client.storage.from(bucket).upload(path, fileBody, {
        ...(options ?? {}),
        upsert: true,
      } as any)
    },
    remove(bucket: string, paths: string[]) {
      return client.storage.from(bucket).remove(paths)
    },
    getPublicUrl(bucket: string, path: string) {
      return client.storage.from(bucket).getPublicUrl(path)
    },
    createSignedUrl(bucket: string, path: string, expiresIn: number) {
      return client.storage.from(bucket).createSignedUrl(path, expiresIn)
    },
  }
}
