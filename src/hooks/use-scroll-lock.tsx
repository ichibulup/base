import { Lock, Unlock } from "lucide-react"
import * as React from "react"

// ============================================================================

interface UseScrollLockOptions {
  autoLock?: boolean
  lockTarget?: HTMLElement | string
  widthReflow?: boolean
}

interface UseScrollLockReturn {
  isLocked: boolean
  lock: () => void
  unlock: () => void
}

interface OriginalStyle {
  overflow: CSSStyleDeclaration["overflow"]
  paddingRight: CSSStyleDeclaration["paddingRight"]
}

const IS_SERVER = typeof window === "undefined"

export function useScrollLock(options: UseScrollLockOptions = {}): UseScrollLockReturn {
  const { autoLock = true, lockTarget, widthReflow = true } = options
  const [isLocked, setIsLocked] = React.useState(false)
  const target = React.useRef<HTMLElement | null>(null)
  const originalStyle = React.useRef<OriginalStyle | null>(null)

  const lock = React.useCallback(() => {
    if (target.current) {
      const { overflow, paddingRight } = target.current.style

      // Save the original styles
      originalStyle.current = { overflow, paddingRight }

      // Prevent width reflow
      if (widthReflow) {
        const offsetWidth =
          target.current === document.body ? window.innerWidth : target.current.offsetWidth
        const currentPaddingRight =
          Number.parseInt(window.getComputedStyle(target.current).paddingRight, 10) || 0

        const scrollbarWidth = offsetWidth - target.current.scrollWidth
        target.current.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`
      }

      // Lock the scroll
      target.current.style.overflow = "hidden"

      setIsLocked(true)
    }
  }, [widthReflow])

  const unlock = React.useCallback(() => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow

      if (widthReflow) {
        target.current.style.paddingRight = originalStyle.current.paddingRight
      }
    }

    setIsLocked(false)
  }, [widthReflow])

  React.useLayoutEffect(() => {
    if (IS_SERVER) {
      return
    }

    if (lockTarget) {
      target.current =
        typeof lockTarget === "string" ? document.querySelector(lockTarget) : lockTarget
    }

    if (!target.current) {
      target.current = document.body
    }

    if (autoLock) {
      lock()
    }

    return () => {
      unlock()
    }
  }, [autoLock, lockTarget, widthReflow, lock, unlock])

  return { isLocked, lock, unlock }
}

export type { UseScrollLockOptions, UseScrollLockReturn }

// ============================================================================