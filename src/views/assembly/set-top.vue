<template>
  <div class="alone-item-set-wrap">
    <!--  -->
    <div class="title-set-part">{{ currnetShowSetData.name }}</div>
    <!-- 页面名称 -->
    <div class="option-wrap">
      <section class="left-container">页面名称</section>
      <section class="right-container">
        <a-input
          class="pageTitle-width"
          :maxlength="10"
          v-model:value="currnetShowSetData.option.title"
          showCount
          :placeholder="currnetShowSetData.option.placeHolder"
        />
      </section>
    </div>
    <!--  -->
    <div class="option-wrap">
      <section class="left-container">背景颜色</section>
      <section class="right-container">
        <input
          type="color"
          :value="currnetShowSetData.option.bgColor"
          @change="bgColorChange"
        />
        <a-button class="mg-l-20" @click="currnetShowSetData.option.bgColor = '#f5f5f5'"
          >重置</a-button
        >
      </section>
    </div>
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

const bgColorChange = (event: any) => {
  currnetShowSetData.option.bgColor = event.target.value;
};

watch(
  () => assemblyStore.setId,
  (id: number, oldId) => {
    getCurrnetShowSetData(id);
  },
  { immediate: true }
);

// const props = defineProps({
//   title: String,
// });
// const pageTitle = ref<string>("");
// let { title } = toRefs(props);
</script>
<style lang="scss" scoped>
@import "../scss/set-top.scss";
</style>
