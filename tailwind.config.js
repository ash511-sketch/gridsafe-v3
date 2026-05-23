/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gs: {
          dark: '#18181b', bgdark: '#2c0606', bglight: '#f9f6f0',
          maroon: '#4a0e0e', crimson: '#8b0000', cream: '#f4f1ea', ivory: '#fcfcfc',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        mono: ['IBM Plex Mono', 'monospace'], 
        display: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
