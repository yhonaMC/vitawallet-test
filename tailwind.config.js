/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif']
      }
    },
    colors: {
      black: {
        100: '#000000'
      },
      grey: {
        100: '#B9C1C2',
        200: '#DEE0E0'
      },
      white: {
        100: '#F9F9FA',
        200: '#F5F6F6',
        300: '#FFFFFF',
        400: '#F9F9F9'
      },
      blue: {
        100: '#167287',
        200: '#05BCB9',
        300: '#0a667f'
      },
      red: {
        100: '#CE3434'
      }
    },
    plugins: []
  }
}
