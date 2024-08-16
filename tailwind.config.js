/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#6482AD',
        secondary: '#7FA1C3',
        accent: '#E2DAD6',
        background: '#F5EDED',
      },
    },
  },
  plugins: [],
}
