import { Pause, Play, RotateCcw } from "lucide-react"
import * as React from "react"

// ============================================================================

export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = React.useRef<() => void>(undefined)

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// ============================================================================