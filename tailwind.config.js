/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fb: {
          blue: '#1877f2',
          blueDark: '#145dbf',
          blueLight: '#e7f0fd',
          green: '#42b72a',
          greenDark: '#36a420',
        },
      },
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease forwards',
        'blob': 'blob 8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-28px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blob: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(20px,30px) scale(1.06)' },
        },
      },
    },
  },
  plugins: [],
}
