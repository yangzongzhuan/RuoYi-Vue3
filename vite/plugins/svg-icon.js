import path from 'node:path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    // eslint-disable-next-line node/prefer-global/process
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons/svg')],
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  })
}
