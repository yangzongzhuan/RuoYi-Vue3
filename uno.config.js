import presetUno from '@unocss/preset-uno'
// uno.config.ts
import { defineConfig, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(), // 支持属性方式写法，如 <div text="red-500" />

  ],
})
