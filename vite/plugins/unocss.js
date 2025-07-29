/**
 * The instant on-demand atomic CSS engine.
 * @see https://github.com/unocss/unocss
 */

import presetUno from '@unocss/preset-uno'
import Unocss from 'unocss/vite'

export function configUnocssPlugin() {
  return Unocss({
    content: { pipeline: { exclude: ['node_modules', '.git', 'dist'] } },
    presets: [presetUno()],
    shortcuts: {
      'flex-center': 'flex justify-center items-center',
      'grid-center': 'grid place-content-center',
    },
    // ...UnoCSS options
    rules: [
      [/^fontSize_(\d+)$/, ([, d]) => ({ 'font-size': `${d}px !important` })],
      // 对于 m_r10，表示右边距为10px
      [/^m_t(\d+)$/, ([, d]) => ({ 'margin-top': `${d}px` })],
      [/^m_r(\d+)$/, ([, d]) => ({ 'margin-right': `${d}px` })],
      [/^m_b(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}px` })],
      [/^m_l(\d+)$/, ([, d]) => ({ 'margin-left': `${d}px` })],

      // 对于 m_x10，表示水平边距（左右）各为10px
      [/^m_x(\d+)$/, ([, d]) => ({ margin: `0 ${d}px` })],
      [/^m_y(\d+)$/, ([, d]) => ({ margin: `${d}px 0` })],
      [/^m_(\d+)$/, ([, d]) => ({ margin: `${d}px` })],

      // padding
      [/^p_t(\d+)$/, ([, d]) => ({ 'padding-top': `${d}px` })],
      [/^p_r(\d+)$/, ([, d]) => ({ 'padding-right': `${d}px` })],
      [/^p_b(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}px` })],
      [/^p_l(\d+)$/, ([, d]) => ({ 'padding-left': `${d}px` })],

      // 对于 m_x10，表示水平边距（左右）各为10px
      [/^p_x(\d+)$/, ([, d]) => ({ padding: `0 ${d}px` })],
      [/^p_y(\d+)$/, ([, d]) => ({ padding: `${d}px 0` })],
      [/^p_(\d+)$/, ([, d]) => ({ padding: `${d}px` })],

      [/^maxWidth_(\d+)$/, ([, d]) => ({ 'max-width': `${d}px !important` })],
      [
        /^w_(.+)$/,
        ([, d]) => {
          const important = d.endsWith('!')
          // 如果包含 `!`，去除 `!` 并加上 `!important`
          if (important) {
            d = d.slice(0, -1)
          }
          return {
            width: important ? `${d}px !important` : `${d}px`,
          }
        },
      ],
    ],
    theme: {},
  })
}
