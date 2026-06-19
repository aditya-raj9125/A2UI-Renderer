/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        borderHover: 'var(--color-border-hover)',
        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
        accent: 'var(--color-accent)',
        accentHover: 'var(--color-accent-hover)',
        inputBg: 'var(--color-input-bg)',
        cardBg: 'var(--color-card-bg)',
        cardBorder: 'var(--color-card-border)',
        badgeText: 'var(--color-badge-text)',
        badgeBg: 'var(--color-badge-bg)',
        badgeBorder: 'var(--color-badge-border)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
