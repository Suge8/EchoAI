const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx,md}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {
            radius: {
              "xl": "0.75rem",    // 12px
              "2xl": "1rem",    // 16px
              "3xl": "1.5rem",  // 24px
            },
          }
        },
        dark: {
          layout: {
            radius: {
              "xl": "0.75rem",    // 12px
              "2xl": "1rem",    // 16px
              "3xl": "1.5rem",  // 24px
            }
          }
        }
      }
    }),
    require('@tailwindcss/typography'),
  ],
}
