/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      white: "#eeee",
      tan: "#B68D40",
      cream: "#F4EBD0",
      charocoal: "#122620",
      gold: "#D6AD60",
      red: "rgb(255, 0, 0)",
      blue: "rgb(41, 71, 122)",
      green: "rgb(156, 255, 56)",
    },
  },
  plugins: [],
};
