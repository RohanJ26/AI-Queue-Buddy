/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f9f5ff",
          100: "#f2e8ff",
          200: "#e3ccff",
          300: "#caa2ff",
          400: "#b279ff",
          500: "#9a51ff",
          600: "#7b22ff",
          700: "#5a16c2",
          800: "#3e0f87",
          900: "#22084d"
        }
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.15)"
      }
    },
  },
  plugins: [],
}
