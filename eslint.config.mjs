import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReactHooksConfig from 'eslint-plugin-react-hooks';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
// import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = [
  {
    files: ['**/*.ts', '**/*.tsx'],
  },
  {
    ignores: ['.next/*'],
  },
  {
    extends: 'next/core-web-vitals',
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfig,
  pluginReactHooksConfig,
  eslintPluginPrettierRecommended,
  // eslintConfigPrettier,
];

export default eslintConfig;
