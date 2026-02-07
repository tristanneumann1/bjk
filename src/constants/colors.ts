/*
  Is this structural?
  → Background / border / text

  Is this something the user can act on?
  → Primary or secondary

  Did something already happen?
  → Success or error

  Is this rare emphasis or insight?
  → Accent
 */

/**
 * Color Palette - Single Source of Truth
 * Define colors once here, they're automatically available in both:
 * - TypeScript/JavaScript: import { COLORS } from '@/constants/colors'
 * - CSS: var(--color-1), var(--color-2), etc.
 */
export const COLORS = {
  colorBackground: '#c9ebeb',
  colorText: '#ffffff',
  colorBorder: '#36394A',
  primary400: '#3282a0',
  primary600: '#3282a0',
  secondary: '#6374c0',
  accent: '#858eaf',
  success: '',
  error: ''
} as const

/**
 * Get CSS custom property value
 * Usage: getCSSColor('color1') returns 'var(--color-1)'
 */
export const getCSSColor = (colorKey: keyof typeof COLORS) => {
  const cssVarName = colorKey.replace(/([A-Z])/g, '-$1').toLowerCase()
  return `var(--${cssVarName})`
}

/**
 * Initialize CSS custom properties from COLORS object
 * Called automatically on app startup
 */
export const initColorVariables = () => {
  const root = document.documentElement
  Object.entries(COLORS).forEach(([key, value]) => {
    const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVarName}`, value)
  })
}
