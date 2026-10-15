/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "forest-green": "#264D3E",
        "deep-forest": "#122D24",
        "brown-sugar": "#AD7651",
        "slate-gray": "#63736B",
        "warm-paper": "#F8F6F0",
        "warm-line": "#E8E4D9",
      },
      boxShadow: {
        editorial: "0 18px 55px rgba(18,45,36,0.10)",
      },
      letterSpacing: {
        editorial: "-0.045em",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
