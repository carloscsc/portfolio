'use client'

import { useState, useEffect } from 'react'

export type DeviceSize = 'mobile' | 'tablet' | 'desktop'

interface ResponsiveState {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  deviceSize: DeviceSize
  width: number
  height: number
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    deviceSize: 'desktop',
    width: 1024,
    height: 768
  })

  useEffect(() => {
    function updateSize() {
      const width = window.innerWidth
      const height = window.innerHeight
      
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024
      
      let deviceSize: DeviceSize = 'desktop'
      if (isMobile) deviceSize = 'mobile'
      else if (isTablet) deviceSize = 'tablet'
      
      setState({
        isMobile,
        isTablet,
        isDesktop,
        deviceSize,
        width,
        height
      })
    }

    // Set initial size
    updateSize()

    // Add event listener
    window.addEventListener('resize', updateSize)
    
    // Cleanup
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return state
}

// Hook for checking if user prefers reduced motion
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

// Hook for touch device detection
export function useTouchDevice(): boolean {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
      )
    }

    setIsTouchDevice(checkTouchDevice())
  }, [])

  return isTouchDevice
}

// Hook for viewport intersection (useful for animations)
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return isIntersecting
}
