/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primario: '#1E3A8A',
        acento: '#10B981',
        fondo: '#F3F4F6',
      },
    },
  },
  plugins: [],
};