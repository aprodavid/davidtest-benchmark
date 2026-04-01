import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f3f4f7'
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.04)'
      }
    }
  },
  plugins: []
};

export default config;
