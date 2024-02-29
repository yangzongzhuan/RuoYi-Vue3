import Components from 'unplugin-vue-components/vite' // 按需加载自定义组件

// ElementPlus 按需引入
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// icon 按需引入
import IconsResolver from 'unplugin-icons/resolver'

export default function createComponents() {
  return Components({
    // dts: true, // enabled by default if `typescript` is installed
    dts: true,
    dirs: ['src/components'],
    resolvers: [ElementPlusResolver(), IconsResolver()]
  })
}
