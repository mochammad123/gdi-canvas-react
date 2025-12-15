import tailwindAnimation from './tailwind/tailwind.animation';
import tailwindColors from './tailwind/tailwind.colors';
import tailwindComponents from './tailwind/tailwind.components';
import tailwindTypography from './tailwind/tailwind.typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
      },
      fontFamily: {
        'open-sans': ['"Open Sans"', 'sans-serif'],
        'source-sans-pro': ['"Source Sans Pro"', 'sans-serif'],
      },
      ...tailwindAnimation,
    },
  },
  plugins: [tailwindTypography, tailwindComponents],
};
