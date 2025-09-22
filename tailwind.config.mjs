/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue,svelte}',
    './src/content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter var','Inter','system-ui','-apple-system','Segoe UI',
          'Roboto','Ubuntu','Cantarell','Noto Sans','Helvetica Neue','Arial','sans-serif'
        ]
      },
      boxShadow: {
        soft: '0 10px 30px rgba(9,27,41,0.08)',
        softLg: '0 18px 40px rgba(9,27,41,0.12)',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1, transform: 'none' } },
        scaleIn: { from: { opacity: 0, transform: 'scale(.98)' }, to: { opacity: 1, transform: 'scale(1)' } },
      },
      animation: {
        'fade-in': 'fadeIn .6s ease-out both',
        'fade-in-delayed': 'fadeIn .8s ease-out .08s both',
        'scale-in': 'scaleIn .35s ease-out both',
      },
    },
  },
  plugins: [],
}
