import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import { viewstate } from "../assets/js/assemblyview";

export const useAssemblyDataStore = defineStore("assemblydata", () => {
  // 组件设置区域组件ID
  let setId = ref(1000);

  // 获取组件数据对象
  const getCurrnetShowSetData = () => {
    return viewstate.list.find((item: any) => {
      return item.id == setId.value;
    });
  };

  return { setId, getCurrnetShowSetData };
});
