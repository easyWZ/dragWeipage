<template>
  <div class="vin-wrap">
    <div class="vin-line-box">
      <section class="l-vin-title">车辆VIN号</section>
      <section class="c-line"></section>
      <section class="select-tip">请选择</section>
      <section class="select-icon"></section>
    </div>
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
.vin-wrap {
  width: 100%;
  padding: 0 5%;
  height: 40px;
  margin: 20px 0;
  
  .vin-line-box {
    width: 100%;
    height: 100%;
    display: flex;
    // align-items: center;
    padding-top: 5px;
    font-size: 14px;
    background: #fff;
    border: 1px solid #fff;
    color: #000;
    box-shadow: -5.33px -5.33px 5.33px #ccc inset;
    border-radius: 5px;
    position: relative;
    .l-vin-title{
    margin-left: 10px;
  }
    .c-line {
      width: 1px;
      height: 100%;
      background-color: #ccc;
      margin-left: 10px;
      position: absolute;
      left: 100px;
      top: 0;
    }
    .select-tip{
      flex: 1;
      display: flex;
      justify-content: center;
      // margin-left: 50px;
    }
    .select-icon{

    }
  }
}
</style>
