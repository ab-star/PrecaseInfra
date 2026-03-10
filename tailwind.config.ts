import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // You can define custom border radius if standard '3xl' doesn't quite match
      borderRadius: {
        '3xl': '1.5rem', // Matches modern Material/Card design
      },
    },
  },
  plugins: [],
};
export default config;