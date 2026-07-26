// import debounce from "lodash.debounce"
// import { Monitor, RotateCw, Smartphone } from "lucide-react"
// import * as React from "react"

// // ============================================================================

// interface UseScreenOptions<InitializeWithValue extends boolean | undefined> {
//   initializeWithValue: InitializeWithValue
//   debounceDelay?: number
// }

// const IS_SERVER = typeof window === "undefined"

// export function useScreen(options: UseScreenOptions<false>): Screen | undefined
// export function useScreen(options?: Partial<UseScreenOptions<true>>): Screen
// export function useScreen(options: Partial<UseScreenOptions<boolean>> = {}): Screen | undefined {
//   let { initializeWithValue = true } = options
//   if (IS_SERVER) {
//     initializeWithValue = false
//   }

//   const readScreen = () => {
//     if (IS_SERVER) {
//       return undefined
//     }
//     return window.screen
//   }

//   const [screen, setScreen] = React.useState<Screen | undefined>(() => {
//     if (initializeWithValue) {
//       return readScreen()
//     }
//     return undefined
//   })

//   const debouncedSetScreen = React.useMemo(
//     () => (options.debounceDelay ? debounce(setScreen, options.debounceDelay) : setScreen),
//     [options.debounceDelay],
//   )

//   React.useEffect(() => {
//     const handleSize = () => {
//       const newScreen = readScreen()

//       if (newScreen) {
//         const { width, height, availHeight, availWidth, colorDepth, orientation, pixelDepth } =
//           newScreen

//         debouncedSetScreen({
//           width,
//           height,
//           availHeight,
//           availWidth,
//           colorDepth,
//           orientation,
//           pixelDepth,
//         } as Screen)
//       }
//     }

//     handleSize()
//     window.addEventListener("resize", handleSize)

//     return () => {
//       window.removeEventListener("resize", handleSize)
//     }
//   }, [debouncedSetScreen])

//   return screen
// }

// export type { UseScreenOptions }

// // ============================================================================