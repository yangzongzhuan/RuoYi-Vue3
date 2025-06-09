import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()
export default antfu(
  {
    vue: {
      overrides: {
        // enforce order of component top-level elements 自定义 Vue 文件中标签的顺序，模板 -> 脚本 -> 样式
        'vue/block-order': ['error', {
          order: ['template', 'script', 'style'],
        }],
      },
    },
    // formatters: true,
    // unocss: true,
    ignores: [
      '**/iconfont.js',
      'node_modules',
      'dist',
      'build/vite/plugins',
      'src/components/Crontab',
      'src/views/tool/build/RightPanel.vue',
    ],
  },
  ...compat.config({
    extends: [
      './.eslintrc-auto-import.json',
    ],
  }),
  {
    files: ['**/*.js', '**/*.vue'],
    rules: {
      'eqeqeq': 'off',
      'vue/eqeqeq': 'off',
      'no-console': 'off',
      'vue/multi-word-component-names': 'off',
      'max-len': ['error', { code: 140 }],
      'jsdoc/require-returns-description': 'off',
      'prefer-const': 'off', // 关闭 prefer-const 规则
      'vue/no-unused-refs': 'off', // 关闭不允许有空的ref
    },

  },
)
