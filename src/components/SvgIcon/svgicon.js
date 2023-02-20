import * as components from '@element-plus/icons-vue'

export default {
  install: (app) => {
    // eslint-disable-next-line guard-for-in
    for (const key in components) {
      const componentConfig = components[key]
      app.component(componentConfig.name, componentConfig)
    }
  },
}
