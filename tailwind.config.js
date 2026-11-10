/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFCFB',
          100: '#FDFBF7',
          200: '#FAF6EE',
          300: '#F5EFEB',
          400: '#EFE6DC',
          500: '#E5D6C5',
        },
        champagne: {
          50: '#FBF9F5',
          100: '#F7F2E8',
          200: '#EFE5D3',
          300: '#E4D5BA',
          400: '#D6C09C',
          500: '#C5A059',
          600: '#B08B42',
        },
        blush: {
          50: '#FDF7F7',
          100: '#F9ECEB',
          200: '#F5DCDA',
          300: '#EFC7C3',
          400: '#E6A8A2',
          500: '#D98982',
        },
        rosegold: {
          light: '#F4DDD9',
          DEFAULT: '#E0A99E',
          dark: '#C88A7F',
        },
        gold: {
          light: '#F3E5AB',
          DEFAULT: '#D4AF37',
          rich: '#C5A059',
          dark: '#997A2E',
        },
        nude: {
          50: '#F8F4F0',
          100: '#EFE6DD',
          200: '#E4D3C5',
          300: '#D5BDA9',
          400: '#C2A38D',
        },
        espresso: {
          500: '#5C4033',
          700: '#3D281E',
          800: '#2C1D15',
          900: '#1F140E',
        },
        burgundy: {
          light: '#8E1B34',
          DEFAULT: '#6B1226',
          dark: '#4F0C1B',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Montserrat"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(197, 160, 89, 0.15)',
        'luxury-lg': '0 20px 40px -15px rgba(74, 53, 37, 0.12)',
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

