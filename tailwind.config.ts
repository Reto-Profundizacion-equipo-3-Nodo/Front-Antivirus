// import type { Config } from "tailwindcss";

// export default {
//   content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       fontFamily: {
//         inter: ["Inter", "sans-serif"],
//         poppins: ["Poppins", "sans-serif"],
//         raleway: ["Raleway", "sans-serif"],
//         nunito: ["Nunito", "sans-serif"],
//         montserrat: ["Montserrat", "sans-serif"],
//         impact: ["Impact", "sans-serif"],
//         reddit: ["Reddit Sans", "sans-serif"],
//       },
//     },
//   },
//   plugins: [require("@tailwindcss/typography")],
// } satisfies Config;
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        impact: ["Impact", "sans-serif"],
        reddit: ["Reddit Sans", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};

export default config;