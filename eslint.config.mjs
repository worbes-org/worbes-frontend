import { FlatCompat } from "@eslint/eslintrc";
import pluginQuery from "@tanstack/eslint-plugin-query";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config} */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...pluginQuery.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [".*"],
              message:
                "Use path imports (@/*) instead of relative imports (../)",
            },
          ],
          paths: [
            {
              name: "next-intl",
              importNames: ["useTranslations"],
              message:
                "Please import useTranslations from `~/hooks/i18n` instead.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
