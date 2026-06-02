/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: '#F8F6F3',
        card: '#FFFFFF',
        primary: {
          50: '#FBF7F5',
          100: '#F2EAE3',
          200: '#EADFD7',
          DEFAULT: '#B08D77',
          600: '#9E7B64',
        },
        secondary: {
          DEFAULT: '#D8C3B5',
          100: '#F3EAE6'
        },
        'text-primary': '#2F2F2F',
        'text-secondary': '#777777',
        border: '#E8E2DC',
        success: {
          DEFAULT: '#7D9D7A',
          100: '#E9F0EA'
        },
        warning: '#C8A45D',
        danger: '#C77B7B',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
