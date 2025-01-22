/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
         OpenSans:['Open Sans', 'sans-serif'],
      comforter:[ 'Comforter', 'cursive'],
      NotoSans:['Noto Sans', 'sans-serif']
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms ease-in-out forwards',
        fadeInOut : 'fadeInOut 5s ease-in-out',
      },
    },
  },
  plugins: [],
  plugins: [require("tailwind-scrollbar-hide")],

}