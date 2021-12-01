import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_APP_WEB_PATH,
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
	// vite 相关配置
    server: {
      open: true,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        [env.VITE_APP_BASE_API]: {
          target: 'http://localhost:7099',
          changeOrigin: true,
          rewrite: (p) => {
            const reg = new RegExp(`^${env.VITE_APP_BASE_API}`);
            return p.replace(reg, '');
          }
        }
      },
    },
  }
})
