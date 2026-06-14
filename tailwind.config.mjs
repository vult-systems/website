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
  	extend: {  		screens: {
  			'3xl': '1920px',
  			'4xl': '2560px',
  		},  		colors: {
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
  		}
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
}