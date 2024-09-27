/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#00304a',  // Primer color personalizado
        //customRed: '#ff0000',   // Otro color personalizado
        customGreen: '#224a1a',
        // Agrega más colores según necesites
      },
    },
  },
  plugins: [],
};

