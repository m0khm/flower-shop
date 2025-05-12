/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}', 
  ],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
