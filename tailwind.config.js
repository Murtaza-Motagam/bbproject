/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#faebee",
        secondary: "#333d7a",
        success: "#198754",
        danger: "#F32013",
        darkPrimary: "#15202B",
        darkSecondary: "#192734",
        darkTerritiary: "#22303C",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
