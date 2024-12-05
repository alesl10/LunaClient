/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content(),],
  theme: {
    extend: {
      colors: {
        primary: "#043d67",
        secondary:"#EAD8B1"
      },
      
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
