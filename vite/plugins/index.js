import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createElComponents from './components'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import { visualizer } from "rollup-plugin-visualizer";


export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue()]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createElComponents())
    vitePlugins.push(createSetupExtend())
    vitePlugins.push(createSvgIcon(isBuild))
    vitePlugins.push(
        visualizer({
            gzipSize: true,
            brotliSize: true,
            emitFile: false,
            filename: "test.html", //分析图生成的文件名
            open: true //如果存在本地服务端口，将在打包后自动展示
        })
    )
    isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
