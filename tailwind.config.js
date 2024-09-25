/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'wel-bg': "url('./src/assets/bg.svg')",
      }
    },
  },
  plugins: [],
}
