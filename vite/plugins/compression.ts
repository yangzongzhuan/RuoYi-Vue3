/*
 * @Description:
 * @Author: Panda
 * @Date: 2024-02-27 15:19:26
 * @LastEditors: Panda
 * @LastEditTime: 2024-02-29 10:56:52
 * @FilePath: \shop-admind:\vueworkspace\RuoYi-Vue3\vite\plugins\compression.ts
 */
import { PluginOption } from 'vite'
import compression from 'vite-plugin-compression'

export default function createCompression(env: Record<string, string>) {
  const { VITE_BUILD_COMPRESS } = env
  const plugin: PluginOption[] = []
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(',')
    if (compressList.includes('gzip')) {
      // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
      plugin.push(
        compression({
          ext: '.gz',
          deleteOriginFile: false
        })
      )
    }
    if (compressList.includes('brotli')) {
      plugin.push(
        compression({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile: false
        })
      )
    }
  }
  return plugin
}
