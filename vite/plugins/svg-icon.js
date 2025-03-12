import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng'
import path from 'path'

export default function createSvgIcon() {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
  })
}
