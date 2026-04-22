/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: [
          '"SF Pro Display"',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
        body: [
          '"SF Pro Text"',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        ink: '#1d1d1f',
        paper: '#fbfbfd',
        muted: '#86868b',
      },
      letterSpacing: {
        tightest: '-0.035em',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
