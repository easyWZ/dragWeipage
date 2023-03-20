<template>
  <!-- 视图模版 -->
  <div></div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch, onMounted } from "vue";
import { viewstate } from "../../assets/js/assemblyview";
const props = defineProps({
  allAssembly: Object,
  assid: Object,
});
let currentAssembly: any = ref({ checked: false, option: {} });
let { allAssembly, assid } = toRefs(props);

const findCurrentOption = (receiveId: any) => {
  let id = receiveId || assid?.value;
  currentAssembly = viewstate.list.find((item: any) => {
    return item.id == id;
  });
};

onMounted(() => {
  findCurrentOption(null);
});

watch(
  () => (assid as any).value,
  (id, oldid) => {
    findCurrentOption(id);
  },
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
