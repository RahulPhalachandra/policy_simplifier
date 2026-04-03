/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'acid': '#D2E823',
        'ink': '#09090B',
        'paper': '#F8F4E8',
      },
      fontFamily: {
        'display': ['"Dela Gothic One"', 'sans-serif'],
        'body': ['"Space Grotesk"', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #09090B',
        'hard-sm': '2px 2px 0px 0px #09090B',
        'hard-lg': '8px 8px 0px 0px #09090B',
      },
      borderRadius: {
        'brutal': '12px',
        'brutal-lg': '32px',
      },
    },
  },
  plugins: [],
}