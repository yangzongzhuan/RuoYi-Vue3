import { defineStore } from 'pinia'

const useDictStore = defineStore(
  'dict',
  {
    state: () => ({
      dict: [],
    }),
    actions: {
      // 获取字典
      getDict(_key) {
        if (_key == null && _key == '') {
          return null
        }
        try {
          for (let i = 0; i < this.dict.length; i++) {
            if (this.dict[i].key == _key) {
              return this.dict[i].value
            }
          }
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
        catch (e) {
          return null
        }
      },
      // 设置字典
      setDict(_key, value) {
        if (_key !== null && _key !== '') {
          this.dict.push({
            key: _key,
            value,
          })
        }
      },
      // 删除字典
      removeDict(_key) {
        let bln = false
        try {
          for (let i = 0; i < this.dict.length; i++) {
            if (this.dict[i].key == _key) {
              this.dict.splice(i, 1)
              return true
            }
          }
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
        catch (e) {
          bln = false
        }
        return bln
      },
      // 清空字典
      cleanDict() {
        this.dict = []
      },
      // 初始字典
      initDict() {
      },
    },
  },
)

export default useDictStore
