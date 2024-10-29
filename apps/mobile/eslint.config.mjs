import baseConfig from "@honeyroots/eslint-config/base";
import reactConfig from "@honeyroots/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".expo/**", "expo-plugins/**"],
  },
  ...baseConfig,
  ...reactConfig,
];
