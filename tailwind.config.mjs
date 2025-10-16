/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		fontFamily: {
  			clarendon: [
  				'Clarendon LT STD',
  				'serif'
  			]
  		},
  		colors: {
  			// Semantic color system
  			background: 'hsl(var(--background))',
  			foreground: {
  				DEFAULT: 'hsl(var(--foreground))',
  				secondary: 'hsl(var(--foreground-secondary))',
  				muted: 'hsl(var(--foreground-muted))'
  			},
  			border: {
  				DEFAULT: 'hsl(var(--border))',
  				hover: 'hsl(var(--border-hover))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				hover: 'hsl(var(--accent-hover))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card-bg))',
  				hover: 'hsl(var(--card-bg-hover))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}