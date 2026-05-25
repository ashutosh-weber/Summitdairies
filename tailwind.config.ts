import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mountain: {
          dark: '#0a0e1a',
          darker: '#050810',
          blue: '#1a2332',
          accent: '#3b82f6',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mountain-gradient': 'linear-gradient(to bottom, #0a0e1a, #1a2332)',
      },
    },
  },
  plugins: [],
};
export default config;
