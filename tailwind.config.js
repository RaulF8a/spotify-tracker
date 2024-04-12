/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#212121',
        navbar: '#000',
        card_gray: '#636363',
        spotify_green: '#1DB954',
        lighter_green: '#3FF086',
      }
    },
  },
  plugins: [],
}

