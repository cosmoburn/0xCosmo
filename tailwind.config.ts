import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      zIndex: {
        max: '9999',
      },
      backgroundColor: {
        paper: '#efe7dc',
        fire: '#fde687',
        purple: '#d88be5',
        darkpurple: '#8340a4',
      },
      colors: {
        paper: '#efe7dc',
        fire: '#fde687',
        purple: '#d88be5',
        darkpurple: '#8340a4',
      },
    },
  },
  plugins: [],
};
export default config;
