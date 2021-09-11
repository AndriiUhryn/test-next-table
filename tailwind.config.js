module.exports = {
  purge: [
    './pages/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      maxWidth: {
        custom: '1200px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
