import useTagsViewStore from '@/store/modules/tagsView'
import router from '@/router'

export default {
  // 刷新当前tab页签
  refreshPage(obj?: any) {
    const { path, query, matched } = router.currentRoute.value
    if (obj === undefined) {
      matched.forEach((m: any) => {
        if (m.components && m.components.default && m.components.default.name) {
          if (!['Layout', 'ParentView'].includes(m.components.default.name)) {
            obj = { name: m.components.default.name, path: path, query: query }
          }
        }
      })
    }
    return useTagsViewStore().delCachedView(obj).then(() => {
      const { path, query } = obj
      router.replace({
        path: '/redirect' + path,
        query: query
      })
    })
  },
  // 关闭当前tab页签，打开新页签
  closeOpenPage(obj?: any) {
    useTagsViewStore().delView(router.currentRoute.value)
    if (obj !== undefined) {
      return router.push(obj)
    }
  },
  // 关闭指定tab页签
  closePage(obj?: any) {
    if (obj === undefined) {
      return useTagsViewStore().delView(router.currentRoute.value).then(({ visitedViews }: { visitedViews: any[] }) => {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          return router.push(latestView.fullPath)
        }
        return router.push('/')
      })
    }
    return useTagsViewStore().delView(obj)
  },
  // 关闭所有tab页签
  closeAllPage() {
    return useTagsViewStore().delAllViews()
  },
  // 关闭左侧tab页签
  closeLeftPage(obj?: any) {
    return useTagsViewStore().delLeftTags(obj || router.currentRoute.value)
  },
  // 关闭右侧tab页签
  closeRightPage(obj?: any) {
    return useTagsViewStore().delRightTags(obj || router.currentRoute.value)
  },
  // 关闭其他tab页签
  closeOtherPage(obj?: any) {
    return useTagsViewStore().delOthersViews(obj || router.currentRoute.value)
  },
  // 打开tab页签
  openPage(title: string, url: string, params?: any) {
    const obj = { path: url, meta: { title: title } } as any
    useTagsViewStore().addView(obj)
    return router.push({ path: url, query: params })
  },
  // 修改tab页签
  updatePage(obj: any) {
    return useTagsViewStore().updateVisitedView(obj)
  }
}
