import { Power, PowerOff, RotateCcw } from "lucide-react"
import * as React from "react"

// ============================================================================

export function useUnmount(fn: () => void): void {
  if (typeof fn !== "function") {
    throw new Error("useUnmount expects a function as argument")
  }

  const fnRef = React.useRef(fn)

  // Keep the function reference up to date
  fnRef.current = fn

  React.useEffect(() => {
    // Return the cleanup function that will be called on unmount
    return () => {
      fnRef.current()
    }
  }, [])
}

// ============================================================================