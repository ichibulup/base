import type {
  RealtimeChannel,
  RealtimeChannelOptions,
  REALTIME_SUBSCRIBE_STATES,
  SupabaseClient,
} from '@supabase/supabase-js'

type SupabaseAnyClient = SupabaseClient<any, any, any>

export type RealtimeUtils = {
  createChannel: (topic: string, options?: RealtimeChannelOptions) => RealtimeChannel
  subscribe: (
    channel: RealtimeChannel,
    callback?: (status: REALTIME_SUBSCRIBE_STATES, error?: Error) => void
  ) => Promise<REALTIME_SUBSCRIBE_STATES>
  removeChannel: (channel: RealtimeChannel) => Promise<'ok' | 'timed out' | 'error'>
  removeAllChannels: () => Promise<('ok' | 'timed out' | 'error')[]>
}

// export function createCommonRealtimeUtils(client: SupabaseAnyClient): RealtimeUtils {
//   return {
//     createChannel(topic: string, options?: RealtimeChannelOptions) {
//       return client.channel(topic, options)
//     },
//     subscribe(
//       channel: RealtimeChannel,
//       callback?: (status: REALTIME_SUBSCRIBE_STATES, error?: Error) => void
//     ) {
//       return new Promise<REALTIME_SUBSCRIBE_STATES>((resolve, reject) => {
//         channel.subscribe((status, error) => {
//           callback?.(status, error)
//
//           if (error) {
//             reject(error)
//             return
//           }
//
//           if (
//             status === 'SUBSCRIBED' ||
//             status === 'CHANNEL_ERROR' ||
//             status === 'TIMED_OUT' ||
//             status === 'CLOSED'
//           ) {
//             resolve(status)
//           }
//         })
//       })
//     },
//     // removeChannel(channel: RealtimeChannel) {
//     //   return client.removeChannel(channel)
//     // },
//     // removeAllChannels() {
//     //   return client.removeAllChannels()
//     // },
//   }
// }
