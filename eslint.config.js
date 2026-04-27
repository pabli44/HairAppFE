const tseslint = require("typescript-eslint");

const angular = require("@angular-eslint/eslint-plugin");
const angularTemplate = require("@angular-eslint/eslint-plugin-template");
const angularTemplateParser = require("@angular-eslint/template-parser");

module.exports = tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "out-tsc/**"],
  },
  {
    files: ["**/*.ts"],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        projectService: true,
      },
    },
    plugins: {
      "@angular-eslint": angular,
    },
    rules: {
      ...angular.configs.recommended.rules,
      // Keep lint usable for a legacy codebase; tighten these later if desired.
      "@angular-eslint/component-selector": "off",
      "@angular-eslint/directive-selector": "off",
      "@angular-eslint/prefer-inject": "off",
      "@angular-eslint/use-lifecycle-interface": "off",
      "@angular-eslint/no-empty-lifecycle-method": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-var": "warn",
      "prefer-const": "warn",
    },
  },
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angularTemplateParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplate,
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      "@angular-eslint/template/eqeqeq": "off",
    },
  },
);
