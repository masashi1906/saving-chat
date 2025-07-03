/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        foreground: '#1F2937',
        card: '#FFFFFF',
        primary: {
          500: '#4F46E5',
          600: '#4338CA',
        },
        secondary: {
          500: '#7C3AED',
          600: '#6D28D9',
        },
        'border-light': 'rgba(0, 0, 0, 0.1)',
        'border-gray': '#E5E7EB',
      },
      boxShadow: {
        'card': '0px 2px 8px 0px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'card': '16px',
      },
      fontFamily: {
        sans: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}