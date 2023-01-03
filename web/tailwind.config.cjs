/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      'sans': ['Inter', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        galaxy: "url(/background-galaxy.png);",
        'nlw-gradient': 'linear-gradient(50deg, #474bff 0%, #705cff 50%, #996dff 100%);',
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%);',
      },
    },
  },
  plugins: [],
}
