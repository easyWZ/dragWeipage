<template>
  <div class="kv-part hover-gac">
    <img
      class="kv-img"
      :style="'width:' + currentAssembly?.option?.width + '%'"
      src="/img/item/kv-1.jpg"
      alt=""
    />
  </div>
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
.kv-part {
  width: 100%;
  height: 300px;
  background: #ccc;
  @include flexCenter;

  .kv-img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}
</style>
