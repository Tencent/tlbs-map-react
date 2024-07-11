//  ESLint 配置文件
// @see: https://zh-hans.eslint.org/
module.exports = {
  // 扩展规则
  extends: [
    require.resolve('@umijs/lint/dist/config/eslint'),
    'eslint-config-tencent',
    'eslint-config-tencent/ts',
  ],
  // 自定义规则
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
  // 忽略的目录和文件
  ignorePatterns: ['dist*/', 'dics-dist/', '.eslintrc.js', 'tlbs-map-react*/'],
};
