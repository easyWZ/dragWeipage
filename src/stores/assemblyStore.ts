import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAssemblyDataStore = defineStore("assemblydata", () => {

  // const count = ref(0);
  // const doubleCount = computed(() => count.value * 2);
  // function increment() {
  //   count.value++;
  // }

  // 组件设置区域组件ID
  let setId = ref(1000);

  return { setId };
});
