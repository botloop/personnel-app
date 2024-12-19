module.exports = {
  content: [
    "./index.html", // Ensure this points to your entry HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript/TypeScript files in your `src` directory
  ],
  theme: {
    extend: {},
    padding: {
      'custom': '2.5rem', // Adds `p-custom` class with 2.5rem padding
    },
  },
  plugins: [],
};
