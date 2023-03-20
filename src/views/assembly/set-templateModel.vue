<template>
  <div class="">
    <div class="title-set-part">{{ currnetShowSetData.name }}-配置</div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { viewstate } from "../../assets/js/assemblyview";
import { useAssemblyDataStore } from "../../stores/assemblyStore";
let currnetShowSetData = ref<any>({});
const assemblyStore = useAssemblyDataStore();

const getCurrnetShowSetData = (changeId: number) => {
  let id = changeId || assemblyStore.setId;
  currnetShowSetData = viewstate.list.find((item: any) => {
    return item.id == id;
  });
};

watch(
  () => assemblyStore.setId,
  (id: number, oldId) => {
    getCurrnetShowSetData(id);
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
