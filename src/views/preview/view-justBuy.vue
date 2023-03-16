<template>
  <div class="just-buy-option-part">
    <div class="buy-left-wrap"></div>
    <div class="buy-right-wrap">
      <a-button type="primary">立即购买</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
const props = defineProps({
  allAssembly: Object,
  assid: Object,
});
let currentAssembly = ref({ checked: false });
let { allAssembly, assid } = toRefs(props);

const findCurrentOption = () => {
  let id = assid?.value;
  currentAssembly = (allAssembly as any).value.find((item: { id: object }) => {
    return item.id == id;
  });
};
findCurrentOption();
</script>
<style lang="scss" scoped>
.just-buy-option-part {
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
  bottom: 0;
  .buy-left-wrap {
    width: 60%;
  }
}
</style>
