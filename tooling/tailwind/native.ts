import type { Config } from "tailwindcss";

import base from "./base";
import rawTheme from "./rawTheme";

// This configuration extends the base Tailwind config and adds custom colors
export default {
  content: base.content,
  presets: [base],
  theme: {
    extend: {
      // Ignoring the type error as per instructions
      // The raw colors from the theme are added here, including potential array values
      // @ts-ignore
      colors: rawTheme.raw.colors
    },
  }
} satisfies Config;
