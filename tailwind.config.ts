import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ], 
  theme: {    
    fontFamily: {
      primary: 'Poppins',
    },
    
    container: {
      padding: {
        DEFAULT: '30px',
        lg: '0',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primary: '#222222',
        secondary: '#F5E6E0',
      },
      backgroundImage: {
        hero: "url('../public/bg_hero.svg')",
      },
      fontFamily: {
        redhat: ['Red Hat Display', 'sans-serif'],
        covered: ['Covered By Your Grace', 'cursive'],
      },
   },
  },
 plugins: [],
}
export default config





