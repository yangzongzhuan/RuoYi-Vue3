// .stylelintrc.js
module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ['stylelint-order'],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    'stylelint-config-standard',
    // standard 规则集合的 scss 版本
    'stylelint-config-standard-scss',
    // 样式属性顺序规则
    'stylelint-config-recess-order',
    'stylelint-config-standard-vue',

  ],
  customSyntax: 'postcss-html',
  overrides: [
    {
      files: ['**/*.(css|html|vue)'],
      customSyntax: 'postcss-html',
    },
    {
      files: ['**/*.{scss,css,sass}'], // css 相关文件由 postcss-scss 处理
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-standard-scss'],
    },
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    // 'prettier/prettier': true,
    // 屏蔽background-color: rgba(0, 0, 0, 0.5);这种写法引起的警告 start
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',
    'hue-degree-notation': 'number',
    'selector-class-pattern': null,
    'font-family-no-missing-generic-family-keyword': null,
    'keyframes-name-pattern': null,
    'scss/dollar-variable-pattern': null,
    'property-no-unknown': null,
    // ----
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'custom-property-empty-line-before': 'never',
  },
}
