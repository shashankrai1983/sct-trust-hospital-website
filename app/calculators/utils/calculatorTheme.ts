// Calculator Theme Configuration - Forest Green + Cream Design
// Aligned with website's color palette from tailwind.config.ts

export const calculatorTheme = {
  // Primary Colors
  primary: '#606c38',        // primary-green
  secondary: '#3D7F2E',      // forest-green
  accent: '#fefae0',         // accent-cream
  highlight: '#dda15e',      // primary-beige
  text: '#283618',          // text-brown
  background: '#fefae0',     // bg-offwhite
  secondaryBrown: '#bc6c25', // secondary-brown

  // Gradients
  gradients: {
    primary: 'from-primary-green/10 to-forest-green/5',
    accent: 'from-accent-cream to-primary-green/5',
    result: 'from-primary-green/20 via-forest-green/10 to-accent-cream',
    button: 'from-primary-green to-forest-green hover:from-forest-green hover:to-primary-green',
  },

  // Shadows
  shadows: {
    warm: 'shadow-warm',
    warmLg: 'shadow-warm-lg',
    custom: '0 10px 30px rgba(96, 108, 56, 0.1)',
  },

  // Animation Colors for Anime.js
  animation: {
    entryFrom: '#fefae0',    // accent-cream
    entryTo: '#606c38',      // primary-green
    highlightGlow: 'rgba(96, 108, 56, 0.2)',
    particleColor: '#3D7F2E', // forest-green
    pulseColor: 'rgba(61, 127, 46, 0.3)',
  },

  // CSS Classes for consistent styling
  classes: {
    card: 'glass-card p-6 max-w-2xl mx-auto',
    input: 'border-2 border-primary-green/20 focus:border-primary-green bg-accent-cream rounded-lg px-4 py-3 transition-colors duration-300',
    button: 'btn-green shadow-warm hover:shadow-warm-lg transition-all duration-300',
    result: 'bg-gradient-to-br from-primary-green/10 to-forest-green/5 border border-primary-green/20 rounded-xl p-6',
    title: 'text-3xl font-bold text-primary-green mb-6 font-heading',
    subtitle: 'text-lg font-medium text-text-brown mb-4',
    disclaimer: 'mt-8 p-4 bg-primary-green/5 border border-primary-green/20 rounded-lg',
    label: 'text-text-brown font-medium mb-2 block',
    error: 'text-red-600 text-sm mt-1',
    success: 'text-forest-green text-sm mt-1',
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: '640px',
    tablet: '768px',
    desktop: '1024px',
  },

  // Animation durations (in milliseconds)
  durations: {
    fast: 300,
    normal: 600,
    slow: 800,
    entry: 800,
    result: 600,
    pulse: 2000,
  },

  // Easing functions for Anime.js
  easing: {
    elastic: 'easeOutElastic(1, .8)',
    bounce: 'easeOutBounce',
    smooth: 'easeOutQuad',
    sharp: 'easeOutCubic',
  },
} as const;

// Type definitions for TypeScript
export type CalculatorTheme = typeof calculatorTheme;
export type ThemeColor = keyof typeof calculatorTheme;
export type ThemeClass = keyof typeof calculatorTheme.classes;

// Utility function to get theme values
export const getThemeValue = (key: string): string => {
  const keys = key.split('.');
  let value: any = calculatorTheme;
  
  for (const k of keys) {
    value = value[k];
    if (value === undefined) return '';
  }
  
  return value;
};

// CSS custom properties for dynamic theming
export const cssVariables = {
  '--calc-primary': calculatorTheme.primary,
  '--calc-secondary': calculatorTheme.secondary,
  '--calc-accent': calculatorTheme.accent,
  '--calc-text': calculatorTheme.text,
  '--calc-bg': calculatorTheme.background,
} as const;