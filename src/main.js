import ElementPlus from 'element-plus'

import locale from 'element-plus/es/locale/lang/zh-cn'

import Cookies from 'js-cookie'
import { createApp } from 'vue'
import { getConfigKey } from '@/api/system/config'
// 字典标签组件
import DictTag from '@/components/DictTag'

// 富文本组件
import Editor from '@/components/Editor'

// 文件上传组件
import FileUpload from '@/components/FileUpload'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload'
// 分页组件
import Pagination from '@/components/Pagination'

// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
import SvgIcon from '@/components/SvgIcon'

import elementIcons from '@/components/SvgIcon/svgicon'
import { useDict } from '@/utils/dict'
import { download } from '@/utils/request'

import { addDateRange, handleTree, parseTime, resetForm, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'

import App from './App'
import directive from './directive' // directive
// 注册指令
import plugins from './plugins' // plugins

import router from './router'
import store from './store'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/styles/index.scss' // global css
// svg图标
import 'virtual:svg-icons-register'
import './permission' // permission control

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.getConfigKey = getConfigKey
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('FileUpload', FileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('Editor', Editor)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.component('svg-icon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default',
})

app.mount('#app')
