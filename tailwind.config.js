/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#02343f",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
