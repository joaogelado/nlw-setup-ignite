/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    extend: {
      colors: {
        background: "#09090A",
      },
      gridTemplateRows: {
        7: "repeat(7, minmax(0, 1fr))",
      },

      keyframes: {
        wiggle: {
          "0%, 100%": {
            backgroundColor: "#09090A",
          },
          "25%": {
            backgroundColor: "#b30000",
          },
          "50%": {
            backgroundColor: "#339933",
          },
          "75%": {
            backgroundColor: "#1663be",
          },
        },
      },
      animation: {
        wiggle: "wiggle 30s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
