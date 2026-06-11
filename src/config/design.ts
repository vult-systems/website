/**
 * Design System Configuration
 * 
 * Single source of truth for all UI styling tokens.
 * Used by components to ensure consistent spacing, sizing, and styling.
 * 
 * When you need to adjust spacing, colors, or component styles globally,
 * change them here and they'll update everywhere automatically.
 */

/**
 * Spacing scale
 * Used for padding, margins, and gaps
 */
export const spacing = {
  none: '',
  xs: 'p-2',
  sm: 'p-4',
  base: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
  '2xl': 'p-16',
} as const;

/**
 * Border radius tokens
 */
export const radius = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  base: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

/**
 * Typography scale
 */
export const typography = {
  size: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
  },
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
  family: {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  },
} as const;

/**
 * Component style variants
 * Define consistent styling patterns for reusable components
 */
export const components = {
  button: {
    base: 'inline-flex items-center justify-center gap-2 cursor-pointer select-none transition-all duration-200 font-medium',
    
    variants: {
      primary: 'bg-card text-forecground hover:bg-accent border border-border hover:scale-105',
      secondary: 'bg-card text-foreground hover:bg-card-hover border border-border hover:scale-105',
      outline: 'bg-transparent text-foreground hover:bg-card border border-border hover:border-border-hover hover:scale-105',
      ghost: 'bg-transparent text-foreground-secondary hover:bg-card hover:text-foreground border border-transparent',
    },
    
    sizes: {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      base: 'px-4 py-2 text-base rounded-md',
      lg: 'px-6 py-3 text-lg rounded-md',
    },
    
    states: {
      disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
    },
  },

  badge: {
    base: 'inline-flex items-center justify-center font-medium whitespace-nowrap',
    
    variants: {
      default: 'bg-card text-foreground border border-border',
      accent: 'bg-accent text-background border border-transparent',
      outline: 'bg-transparent text-foreground-secondary border border-border',
      muted: 'bg-card text-foreground-muted border border-border',
      ghost: 'bg-transparent text-foreground-secondary border border-transparent hover:bg-card transition-colors duration-200',
    },
    
    sizes: {
      sm: 'px-2 py-0.5 text-xs rounded-md',
      base: 'px-2.5 py-1 text-sm rounded-md',
    },
  },

  card: {
    base: 'rounded-md block',
    
    variants: {
      default: 'bg-card border border-border',
      bordered: 'bg-card border-2 border-border',
      elevated: 'bg-card border border-border shadow-lg',
    },
    
    padding: {
      none: '',
      sm: 'p-4',
      base: 'p-6',
      lg: 'p-8',
    },
    
    interactive: 'group hover:bg-card-hover hover:border-border-hover hover:scale-[1.005] transition-all duration-300 cursor-pointer',
  },

  link: {
    base: 'inline-block transition-all duration-200 cursor-pointer no-underline',
    
    variants: {
      default: 'text-foreground hover:text-accent hover:scale-105',
      muted: 'text-foreground-secondary hover:text-foreground hover:scale-105',
      accent: 'text-accent hover:text-accent-hover hover:scale-105',
      ghost: 'text-foreground-secondary hover:text-foreground hover:scale-105',
    },
    
    underline: {
      always: 'underline underline-offset-4',
      hover: 'hover:underline underline-offset-4',
      none: '',
    },
  },

  heading: {
    base: 'font-normal',
    
    sizes: {
      sm: 'text-lg',
      base: 'text-xl',
      lg: 'text-2xl',
      xl: 'text-3xl',
      '2xl': 'text-4xl',
      '3xl': 'text-5xl',
      '4xl': 'text-6xl',
      '4.5xl': 'text-[4rem]',
      '5xl': 'text-7xl',
    },
  },

  text: {
    base: '',
    
    variants: {
      default: 'text-foreground',
      secondary: 'text-foreground-secondary',
      muted: 'text-foreground-muted',
      accent: 'text-accent',
    },
    
    sizes: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-xl',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },

  input: {
    base: 'w-full rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200',
    
    sizes: {
      sm: 'px-2 py-1 text-sm',
      base: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    },
    
    states: {
      disabled: 'opacity-50 cursor-not-allowed',
      error: 'border-red-500 focus:ring-red-500',
    },
  },
} as const;

/**
 * Layout utilities
 */
export const layout = {
  container: 'max-w-[102rem] mx-auto px-4 sm:px-6 md:px-8',
  section: {
    base: 'py-16 sm:py-24',
    sm: 'py-8 sm:py-12',
    lg: 'py-24 sm:py-32',
  },
  grid: {
    cols1: 'grid grid-cols-1 gap-6',
    cols2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
    cols3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    cols4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    end: 'flex items-center justify-end',
  },
} as const;

/**
 * Animation & Transitions
 */
export const animation = {
  transition: {
    fast: 'transition-all duration-150',
    base: 'transition-all duration-200',
    slow: 'transition-all duration-300',
  },
  hover: {
    scale: 'hover:scale-105',
    scaleSmall: 'hover:scale-[1.02]',
    scaleLarge: 'hover:scale-110',
  },
} as const;

/**
 * Helper function to combine classes
 * Filters out falsy values for conditional styling
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Type-safe component variant builder
 * Use this to build component class strings with IntelliSense
 */
export function buildComponentClasses<T extends keyof typeof components>(
  component: T,
  options: {
    variant?: string;
    size?: string;
    className?: string;
    [key: string]: string | boolean | undefined;
  }
): string {
  const config = components[component];
  const classes: (string | false | undefined)[] = [
    // @ts-ignore - dynamic property access
    config.base,
  ];

  if (options.variant && 'variants' in config) {
    // @ts-ignore - dynamic property access
    classes.push(config.variants[options.variant]);
  }

  if (options.size && 'sizes' in config) {
    // @ts-ignore - dynamic property access
    classes.push(config.sizes[options.size]);
  }

  if (options.className) {
    classes.push(options.className);
  }

  return cn(...classes);
}
