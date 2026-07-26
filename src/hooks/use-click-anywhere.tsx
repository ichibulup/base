import * as React from "react"

// ============================================================================

function useEventListener(eventName: string, handler: (event: MouseEvent) => void) {
  const savedHandler = React.useRef(handler)

  React.useEffect(() => {
    savedHandler.current = handler
  }, [handler])

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const eventListener = (event: Event) => savedHandler.current(event as MouseEvent)
    document.addEventListener(eventName, eventListener)
    return () => document.removeEventListener(eventName, eventListener)
  }, [eventName])
}

export function useClickAnyWhere(handler: (event: MouseEvent) => void): void {
  useEventListener("click", event => {
    handler(event)
  })
}

// ============================================================================