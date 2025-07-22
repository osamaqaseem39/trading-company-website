/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        emeraldPine: '#003E29',
        oliveDrab: '#6B8E23',
        sandstone: '#ededed',
        deepTeal: '#264E46',
        brandDark: '#001a33',
      },
    },
  },
  plugins: [],
} 