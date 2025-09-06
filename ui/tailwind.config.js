// ui/tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // ileride :root.dark ile kullanabil
  theme: {
    extend: {
      colors: {
        // Doğru eşleştirmeler (var() kullan)
        'white': 'var(--white)',
        'black': 'var(--black)',

        'cyan-600': 'var(--cyan-600)',    // ⚠️ düzeltildi
        'cyan-700': 'var(--cyan-700)',
        'blue-100': 'var(--blue-100)',
        'blue-600': 'var(--blue-600)',
        'orange-500': 'var(--orange-500)',
        'orange-600': 'var(--orange-600)',
        'orange-100': 'var(--orange-100)',
        'yellow-100': 'var(--yellow-100)',
        'yellow-600': 'var(--yellow-600)',
        'gray-200': 'var(--gray-200)',
        'gray-400': 'var(--gray-400)',
        'gray-600': 'var(--gray-600)',
        'gray-700': 'var(--gray-700)',
        'gray-900': 'var(--gray-900)',
      },
      fontFamily: {
        // Tailwind kullanırken yine de değişkenlere sadık kal
        primary: ['var(--font-primary)', 'sans-serif'],
        secondary: ['var(--font-secondary)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        inter: ['Inter', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: 'var(--border-radius-sm)',
        md: 'var(--border-radius-md)',
        lg: 'var(--border-radius-lg)',
        xl: 'var(--border-radius-xl)',
        '2xl': 'var(--border-radius-2xl)',
      },
      transitionTimingFunction: {
        fast: 'var(--transition-fast)',
        normal: 'var(--transition-normal)',
        slow: 'var(--transition-slow)',
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
}