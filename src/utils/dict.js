import useDictStore from '@/store/modules/dict';
import { getDicts } from '@/api/system/dict/data';

/**
 * 获取字典数据
 */
export function useDict(...args) {
  const res = ref({});
  return (() => {
    args.forEach((dictType, index) => {
      res.value[dictType] = [];
      const dicts = useDictStore().getDict(dictType);
      if (dicts) {
        res.value[dictType] = dicts;
      } else {
        getDicts(dictType).then((resp) => {
          res.value[dictType] = resp.data.map((p) => ({
            label: p.dictLabel,
            value: p.dictValue,
            elTagType: p.listClass,
            elTagClass: p.cssClass
          }));
          useDictStore().setDict(dictType, res.value[dictType]);
        });
      }
    });
    //  当从组合式函数中返回响应式对象时，toRefs 相当有用。使用它，消费者组件可以解构/展开返回的对象而不会失去响应性：
    // 可以解构而不会失去响应性
    // const { foo, bar } = useFeatureX()
    return toRefs(res.value);
  })();
}
