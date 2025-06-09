import { getDicts } from '@/api/system/dict/data'
import useDictStore from '@/store/modules/dict'

/**
 * 获取字典数据
 */
export function useDict(...args) {
  const res = ref({})
  return (() => {
    args.forEach((dictType, _index) => {
      res.value[dictType] = []
      const dicts = useDictStore().getDict(dictType)
      if (dicts) {
        res.value[dictType] = dicts
      }
      else {
        getDicts(dictType).then((resp) => {
          res.value[dictType] = resp.data.map((p) => {
            return { label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }
          })
          useDictStore().setDict(dictType, res.value[dictType])
        })
      }
    })
    return toRefs(res.value)
  })()
}
