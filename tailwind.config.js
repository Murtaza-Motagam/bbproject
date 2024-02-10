/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#faebee",
        secondary: "#333d7a"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
