module.exports = {
  mode: "jit",
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  purge: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/*.{js,jsx,ts,tsx}",
    "./src/**/**/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: "#262d3d",
        blue: {
          500: "#1672ec",
        },
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      mono: ["Monaco", "monospace"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
