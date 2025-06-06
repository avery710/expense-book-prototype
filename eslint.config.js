import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config({ ignores: ["dist"] }, eslintConfigPrettier, {
  files: ["**/*.{ts,tsx}"],
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    prettier: prettier,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": "error",
    // Turn off rules that conflict with Prettier
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
});
