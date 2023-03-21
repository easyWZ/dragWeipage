<template>
  <div class="rule-wrap">活动规则</div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
const props = defineProps({
  allAssembly: Object,
  assid: Object,
});
let currentAssembly = ref({ checked: false });
let { allAssembly, assid } = toRefs(props);

// const findCurrentOption = () => {
//   let id = assid?.value;
//   currentAssembly = (allAssembly as any).value.find((item: { id: object }) => {
//     return item.id == id;
//   });
// };
// findCurrentOption();
</script>
<style lang="scss" scoped>
.rule-wrap {
  @include flexCenter;
  width: 100%;
  height: 200px;
  // background-color: #ccc;
}
</style>
