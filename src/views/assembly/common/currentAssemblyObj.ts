import { ref, toRefs, watch } from "vue";
import { useAssemblyDataStore } from "../../../stores/assemblyStore";

const assemblyStore = useAssemblyDataStore();
let currnetShowSetData = ref<any>({});
watch(
  () => assemblyStore.setId,
  (id: number, oldId) => {
    currnetShowSetData = assemblyStore.getCurrnetShowSetData();
  },
  { immediate: true }
);

export default currnetShowSetData