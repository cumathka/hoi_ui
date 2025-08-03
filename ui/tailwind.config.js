module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-600': 'var(--yellow-600)',
        'orange-600': 'var(--orange-600)',
        'cyan-600':  '#fd7e14',
        'cyan-700': 'var(--cyan-700)',
        'blue-100': 'var(--blue-100)',
        'blue-600': 'var(--blue-600)',
        'gray-600': 'var(--gray-600)',
      },
      fontFamily: {
        'inter': ['Inter', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
