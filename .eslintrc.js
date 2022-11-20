module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    // 添加`prettier`拓展 用于和`prettier`冲突时覆盖`eslint`规则
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    "@typescript-eslint"
  ],
  rules: {
  }
}
