<template>
  <div class="goods-wrap">商品区域</div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch, onMounted } from "vue";
import { viewstate } from "../../assets/js/assemblyview";
const props = defineProps({
  allAssembly: Object,
  assid: Object,
});
let currentAssembly: any = ref({ checked: false, option: { width: 100 } });
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
<style lang="scss" scoped>
.goods-wrap {
  @include flexCenter;
  width: 100%;
  height: 200px;
  // background-color: #ccc;
}
</style>
