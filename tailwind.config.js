/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          to: { 'background-position': '200% center' },
        },
        glow: {
          from: { 'box-shadow': '0 0 20px rgba(192, 132, 252, 0)' },
          to: { 'box-shadow': '0 0 20px rgba(192, 132, 252, 0.5)' }
        }
      },
      backgroundSize: {
        '300%': '300%',
      },
      colors: {
        dark: {
          bg: '#000000',
          card: '#111111',
          border: '#333333',
          input: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};