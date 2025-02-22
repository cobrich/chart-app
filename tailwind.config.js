/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      width: {
        'screen': '100vw',
      },
      height: {
        'screen': '100vh',
      },
    },
  },
  plugins: [],
}

