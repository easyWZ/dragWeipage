import { ref, watch } from "vue";
// import { useAssemblyDataStore } from "../../stores/assemblyStore";
import { viewstate } from "../../assets/js/assemblyview";

const useGetCurrentData = (setId: any) => {
  let currnetShowSetData = ref<any>({});
  //   const assemblyStore = useAssemblyDataStore();

  const getCurrnetShowSetData = (id: any) => {
    currnetShowSetData = viewstate.list.find((item: any) => {
      return item.id == id;
    });
  };

  watch(
    () => setId,
    (id: any, oldId) => {
      console.log(setId, "setId---===");
      getCurrnetShowSetData(id);
    },
    { immediate: true }
  );

  return {
    currnetShowSetData,
    getCurrnetShowSetData,
  };
};

export default useGetCurrentData;
