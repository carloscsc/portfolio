import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Responsive breakpoint utilities
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export type Breakpoint = keyof typeof breakpoints

// Generate responsive classes based on breakpoint values
export function getResponsiveClasses(
  baseClasses: string,
  responsiveClasses: Partial<Record<Breakpoint, string>>
): string {
  const classes = [baseClasses]
  
  Object.entries(responsiveClasses).forEach(([breakpoint, className]) => {
    if (className) {
      classes.push(`${breakpoint}:${className}`)
    }
  })
  
  return classes.join(' ')
}

// Format breakpoint values for consistent usage
export function formatBreakpointValue(
  value: string | number,
  unit: 'px' | 'rem' | '%' = 'px'
): string {
  if (typeof value === 'number') {
    return `${value}${unit}`
  }
  return value
}

// Improved scroll behavior for mobile with offset consideration
export function scrollToElementWithOffset(
  elementId: string,
  offset: number = 80
): void {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top
  const offsetPosition = elementPosition + window.pageYOffset - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

// Responsive container utilities
export const containerSizes = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md', 
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full'
} as const

export const containerPadding = {
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8'
} as const

// Grid utilities for responsive layouts
export function getGridColumns(columns: {
  mobile: number
  tablet?: number
  desktop: number
}): string {
  const classes = [`grid-cols-${columns.mobile}`]
  
  if (columns.tablet) {
    classes.push(`md:grid-cols-${columns.tablet}`)
  }
  
  classes.push(`lg:grid-cols-${columns.desktop}`)
  
  return classes.join(' ')
}

// Gap utilities
export const gapSizes = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
} as const

// Typography responsive utilities
export function getResponsiveText(size: 'sm' | 'md' | 'lg' | 'xl'): string {
  const textSizes = {
    sm: 'text-sm md:text-base',
    md: 'text-base md:text-lg',
    lg: 'text-lg md:text-xl lg:text-2xl',
    xl: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl'
  }
  
  return textSizes[size]
}

// Spacing utilities
export const spacingSizes = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-20',
  xl: 'py-20 md:py-24'
} as const
