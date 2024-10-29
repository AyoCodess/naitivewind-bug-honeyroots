import type { Config } from "tailwindcss";
// @ts-expect-error - no types
import nativewind from "nativewind/preset";

import baseConfig from "@honeyroots/tailwind-config/native";

export default {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  presets: [baseConfig,nativewind],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ggRegular"],
        ggBlack: ["ggBlack"],
        ggBold: ["ggBold"],
        ggBoldItalic: ["ggBoldItalic"],
        ggExtraBold: ["ggExtraBold"],
        ggExtraLight: ["ggExtraLight"],
        ggLight: ["ggLight"],
        ggMedium: ["ggMedium"],
        ggMediumItalic: ["ggMediumItalic"],
        ggRegular: ["ggRegular"],
        ggSemiBold: ["ggSemiBold"],
        ggSemiBoldItalic: ["ggSemiBoldItalic"],
        ggThin: ["ggThin"],
        ggItalic: ["ggItalic"],
      },
    },
  },
} satisfies Config;
