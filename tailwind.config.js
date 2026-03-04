/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        arabic: ['Cairo', 'IBM Plex Sans Arabic', 'sans-serif'],
        english: ['Inter', 'Poppins', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px rgba(59,130,246,0.25)'
      }
    }
  },
  plugins: []
};
