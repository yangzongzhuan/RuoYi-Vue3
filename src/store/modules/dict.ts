/*
 * @Description:
 * @Author: Panda
 * @Date: 2024-02-27 15:19:26
 * @LastEditors: Panda
 * @LastEditTime: 2024-02-28 15:20:48
 * @FilePath: \shop-admind:\vueworkspace\RuoYi-Vue3\src\store\modules\dict.ts
 */
import { defineStore } from 'pinia'

type dictType = string | null | undefined

const useDictStore = defineStore('dict', {
  state: (): {
    dict: any[]
  } => ({
    dict: []
  }),
  actions: {
    // 获取字典
    getDict(_key: string | null): dictType {
      if (_key == null && _key == '') {
        return ''
      }
      try {
        for (let i = 0; i < this.dict.length; i++) {
          if (this.dict[i].key == _key) {
            return this.dict[i].value
          }
        }
      } catch (e) {
        return ''
      }
    },
    // 设置字典
    setDict(_key: dictType, value: string): void {
      if (_key !== null && _key !== '') {
        this.dict.push({
          key: _key,
          value: value
        })
      }
    },
    // 删除字典
    removeDict(_key: string): boolean {
      var bln = false
      try {
        for (let i = 0; i < this.dict.length; i++) {
          if (this.dict[i].key == _key) {
            this.dict.splice(i, 1)
            return true
          }
        }
      } catch (e) {
        bln = false
      }
      return bln
    },
    // 清空字典
    cleanDict() {
      this.dict = new Array()
    },
    // 初始字典
    initDict() {}
  }
})

export default useDictStore
