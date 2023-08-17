module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:promise/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['@typescript-eslint', 'promise', 'prettier'],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json']
  },
  /**
   * 0 = skip
   * 1 = warning
   * 2 = error
   */
  rules: {
    'no-console': 1,
    'prettier/prettier': 2,
    '@typescript-eslint/no-var-requires': 0
  }
};
