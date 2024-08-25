module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'package.json'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    //'@typescript-eslint/indent': ['error', 'tab', { 'SwitchCase': 1, 'flatTernaryExpressions': true }],
    "prettier/prettier": ["warn", { useTabs: true, singleQuote: true, tabWidth: 2, endOfLine: "auto" }],
    "max-len": ["error", {"code": 140, "ignoreTemplateLiterals": true }],
  },
};
