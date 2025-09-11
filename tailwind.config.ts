/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-black': 'var(--color-black)',
        'custom-gold': 'var(--color-gold)',
        'custom-white': 'var(--color-white)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
      },
      spacing: {
        'section-x-desktop': 'var(--margin-section-x-desktop)',
        'section-y-desktop': 'var(--margin-section-y-desktop)',
      },
      padding: {
        'section-x-desktop': 'var(--padding-section-x-desktop)',
        'section-y-desktop': 'var(--padding-section-y-desktop)',
      },
      margin: {
        'section-x-desktop': 'var(--margin-section-x-desktop)',
        'section-y-desktop': 'var(--margin-section-y-desktop)',
      },
    },
  },
  plugins: [],
}