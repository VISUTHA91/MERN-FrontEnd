/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
         OpenSans:['Open Sans', 'sans-serif'],
      //  SourGummy:[ 'Sour Gummy', 'sans-serif']
      comforter:[ 'Comforter', 'cursive'],
      NotoSans:['Noto Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}