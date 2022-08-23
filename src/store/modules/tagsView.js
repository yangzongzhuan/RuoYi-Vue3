const useTagsViewStore = defineStore(
  'tags-view',
  {
    state: () => ({
      visitedViews: [],
      cachedViews: [],
      iframeViews: []
    }),
    actions: {
      addView(view) {
        this.addVisitedView(view)
        this.addCachedView(view)
      },
      addIframeView(view) {
        if (this.iframeViews.some(v => v.path === view.path)) return
        this.iframeViews.push(
          Object.assign({}, view, {
            title: view.meta.title || 'no-name'
          })
        )
      },
      addVisitedView(view) {
        if (this.visitedViews.some(v => v.path === view.path)) return
        this.visitedViews.push(
          Object.assign({}, view, {
            title: view.meta.title || 'no-name'
          })
        )
      },
      addCachedView(view) {
        if (this.cachedViews.includes(view.name)) return
        if (!view.meta.noCache) {
          this.cachedViews.push(view.name)
        }
      },
      delView(view) {
        return new Promise(resolve => {
          this.delVisitedView(view)
          this.delCachedView(view)
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews]
          })
        })
      },
      delVisitedView(view) {
        return new Promise(resolve => {
          for (const [i, v] of this.visitedViews.entries()) {
            if (v.path === view.path) {
              this.visitedViews.splice(i, 1)
              break
            }
          }
          this.iframeViews = this.iframeViews.filter(item => item.path !== view.path)
          resolve([...this.visitedViews])
        })
      },
      delIframeView(view) {
        return new Promise(resolve => {
          this.iframeViews = this.iframeViews.filter(item => item.path !== view.path)
          resolve([...this.iframeViews])
        })
      },
      delCachedView(view) {
        return new Promise(resolve => {
          const index = this.cachedViews.indexOf(view.name)
          index > -1 && this.cachedViews.splice(index, 1)
          resolve([...this.cachedViews])
        })
      },
      delOthersViews(view) {
        return new Promise(resolve => {
          this.delOthersVisitedViews(view)
          this.delOthersCachedViews(view)
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews]
          })
        })
      },
      delOthersVisitedViews(view) {
        return new Promise(resolve => {
          this.visitedViews = this.visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path
          })
          this.iframeViews = this.iframeViews.filter(item => item.path === view.path)
          resolve([...this.visitedViews])
        })
      },
      delOthersCachedViews(view) {
        return new Promise(resolve => {
          const index = this.cachedViews.indexOf(view.name)
          if (index > -1) {
            this.cachedViews = this.cachedViews.slice(index, index + 1)
          } else {
            this.cachedViews = []
          }
          resolve([...this.cachedViews])
        })
      },
      delAllViews(view) {
        return new Promise(resolve => {
          this.delAllVisitedViews(view)
          this.delAllCachedViews(view)
          resolve({
            visitedViews: [...this.visitedViews],
            cachedViews: [...this.cachedViews]
          })
        })
      },
      delAllVisitedViews(view) {
        return new Promise(resolve => {
          const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
          this.visitedViews = affixTags
          this.iframeViews = []
          resolve([...this.visitedViews])
        })
      },
      delAllCachedViews(view) {
        return new Promise(resolve => {
          this.cachedViews = []
          resolve([...this.cachedViews])
        })
      },
      updateVisitedView(view) {
        for (let v of this.visitedViews) {
          if (v.path === view.path) {
            v = Object.assign(v, view)
            break
          }
        }
      },
      delRightTags(view) {
        return new Promise(resolve => {
          const index = this.visitedViews.findIndex(v => v.path === view.path)
          if (index === -1) {
            return
          }
          this.visitedViews = this.visitedViews.filter((item, idx) => {
            if (idx <= index || (item.meta && item.meta.affix)) {
              return true
            }
            const i = this.cachedViews.indexOf(item.name)
            if (i > -1) {
              this.cachedViews.splice(i, 1)
            }
            if(item.meta.link) {
              const fi = this.iframeViews.findIndex(v => v.path === item.path)
              this.iframeViews.splice(fi, 1)
            }
            return false
          })
          resolve([...this.visitedViews])
        })
      },
      delLeftTags(view) {
        return new Promise(resolve => {
          const index = this.visitedViews.findIndex(v => v.path === view.path)
          if (index === -1) {
            return
          }
          this.visitedViews = this.visitedViews.filter((item, idx) => {
            if (idx >= index || (item.meta && item.meta.affix)) {
              return true
            }
            const i = this.cachedViews.indexOf(item.name)
            if (i > -1) {
              this.cachedViews.splice(i, 1)
            }
            if(item.meta.link) {
              const fi = this.iframeViews.findIndex(v => v.path === item.path)
              this.iframeViews.splice(fi, 1)
            }
            return false
          })
          resolve([...this.visitedViews])
        })
      }
    }
  })

export default useTagsViewStore
