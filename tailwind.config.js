// tailwind.config.js
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          'forest-green': '#009D22',
          'brown-sugar': '#BE6E46',
          'slate-gray': '#7286A0',
        },
      },
    },
    plugins: [require('@tailwindcss/typography')],
  };
  