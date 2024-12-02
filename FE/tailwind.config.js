/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arial: ['Arial', 'sans-serif','Roboto'],
      },
      lineClamp: {
        2: '2', // Để giới hạn 2 dòng
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'),],
};
