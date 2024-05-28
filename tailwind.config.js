/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "375px",
      md: "550px",
      xl: "1440px"
    },
    extend: {
      colors: {
        rootLightGray: "hsl(0, 0%, 98%)",
        rootLightGrayBlue: {
          100: "hsl(236, 33%, 92%)",
          200: "hsl(233, 11%, 84%)",
          300: "hsl(236, 9%, 61%)",
          400: "hsl(235, 19%, 35%)"
        },
        rootDarkGrayBlue: {
          100: "hsl(234, 39%, 85%)",
          200: "hsl(234, 11%, 52%)",
          300: "hsl(235, 24%, 19%)",
          hover: "hsl(236, 33%, 92%)"
        },
        rootDarkBlue: "hsl(235, 21%, 11%)",
        rootGraFrom: "hsl(192, 100%, 67%)",
        rootGraTo: "hsl(280, 87%, 65%)"
      },
      fontFamily: {
        custom: ["Josefin Sans", "sans-serif"]
      }
    },
  },
  plugins: [],
}

