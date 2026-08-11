export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        accent: '#14B8A6',
        soft: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        darkhero: '#0F172A'
      },
      boxShadow: {
        premium: '0 25px 60px rgba(31, 41, 55, 0.12)',
        card: '0 18px 40px rgba(15, 23, 42, 0.08)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
