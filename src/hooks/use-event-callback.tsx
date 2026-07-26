import { Minus, Plus, RotateCcw } from "lucide-react"
import * as React from "react"

// ============================================================================

function useIsomorphicLayoutEffect(effect: React.EffectCallback, deps?: React.DependencyList) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // biome-ignore lint/correctness/useHookAtTopLevel: Intentional isomorphic hook pattern for SSR compatibility
    React.useLayoutEffect(effect, deps)
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // biome-ignore lint/correctness/useHookAtTopLevel: Intentional isomorphic hook pattern for SSR compatibility
    React.useEffect(effect, deps)
  }
}

export function useEventCallback<Args extends unknown[], R>(
  fn: (...args: Args) => R,
): (...args: Args) => R
export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined
export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined,
): ((...args: Args) => R) | undefined {
  const ref = React.useRef<typeof fn>(() => {
    throw new Error("Cannot call an event handler while rendering.")
  })

  useIsomorphicLayoutEffect(() => {
    ref.current = fn
  }, [fn])

  return React.useCallback((...args: Args) => ref.current?.(...args), []) as (...args: Args) => R
}

// ============================================================================