// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    // если используете shadcn/ui — подключаем его стили
    './node_modules/@shadcn/ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // здесь можно добавить свои цвета, шрифты, брейкпоинты и т.д.
      // example:
      // colors: { primary: '#4CAF50' },
    },
  },
  plugins: [
    // формы (shadcn/ui карточки используют <input> и <select>)
    require('@tailwindcss/forms'),
    // анимации (например animate-bounce, fade и т.п.)
    require('tailwindcss-animate'),
  ],
};
