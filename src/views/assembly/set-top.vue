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
    <!-- 背景颜色 -->
    <div class="option-wrap">
      <section class="left-container">背景颜色</section>
      <section class="right-container">
        <input
          type="color"
          :value="currnetShowSetData.option.bgColor"
          @change="bgColorChange"
        />
        <a-button
          class="mg-l-70"
          @click="currnetShowSetData.option.bgColor = '#f5f5f5'"
          >重置</a-button
        >
      </section>
    </div>
    <!-- 背景图片 -->
    <div class="option-wrap">
      <section class="left-container">背景图片</section>
      <section class="right-container">
        <!--  -->
        <div class="upload-img-wrap">
          <div class="show-file-wrap">
            <img
              class="file-img-show"
              @click="contactFileClick('bgfileInput')"
              :src="currnetShowSetData.option.bgSrc"
              alt=""
            />
            <div
              class="deal-empty-img"
              @click="contactFileClick('bgfileInput')"
              v-show="!currnetShowSetData.option.bgSrc"
            >
              <PlusCircleOutlined class="add-css" />
            </div>
          </div>
          <input
            id="bgfileInput"
            class="file-upload-input"
            type="file"
            @change="changeImg($event, 1)"
          />
        </div>
        <a-button
          class="mg-l-20"
          @click="currnetShowSetData.option.bgSrc = ''"
          >重置</a-button
        >
      </section>
    </div>
    <!-- 分享标题 -->
    <div class="option-wrap">
      <section class="left-container">分享标题</section>
      <section class="right-container">
        <a-textarea
          v-model:value="currnetShowSetData.option.share.title"
          :placeholder="currnetShowSetData.option.share.titlePlaceholder"
          allow-clear
          :maxlength="20"
          showCount
          class="pageTitle-width"
        />
        <a-tooltip placement="left">
          <template #title>
            <img
              class="demo-img"
              src="/img/item/demo/demo-title.png"
              alt=""
            />
          </template>
          <span class="demo-hover">示例</span>
        </a-tooltip>
      </section>
    </div>
    <!-- 分享描述 -->
    <div class="option-wrap">
      <section class="left-container">分享描述</section>
      <section class="right-container">
        <a-textarea
          v-model:value="currnetShowSetData.option.share.content"
          :placeholder="currnetShowSetData.option.share.contentPlaceholder"
          allow-clear
          :maxlength="30"
          showCount
          :rows="2"
          class="pageTitle-width"
        />
        <a-tooltip placement="left">
          <template #title>
            <img
              class="demo-img"
              src="/img/item/demo/demo-content.png"
              alt=""
            />
          </template>
          <span class="demo-hover">示例</span>
        </a-tooltip>
      </section>
    </div>
    <!-- 分享图片 -->
    <div class="option-wrap">
      <section class="left-container">分享图片</section>
      <section class="right-container">
        <!--  -->
        <div class="upload-img-wrap">
          <div class="show-file-wrap">
            <img
              class="file-img-show"
              @click="contactFileClick('fileInput')"
              :src="currnetShowSetData.option.share.imgUrl"
              alt=""
            />
            <div
              class="deal-empty-img"
              @click="contactFileClick('fileInput')"
              v-show="!currnetShowSetData.option.share.imgUrl"
            >
              <PlusCircleOutlined class="add-css" />
            </div>
          </div>
          <input
            id="fileInput"
            class="file-upload-input"
            type="file"
            @change="changeImg($event, 2)"
          />
        </div>
        <a-tooltip placement="left">
          <template #title>
            <img
              class="demo-img"
              src="/img/item/demo/demo-img.png"
              alt=""
            />
          </template>
          <span class="demo-hover">示例</span>
        </a-tooltip>
      </section>
    </div>
    <!--  -->
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { viewstate } from "../../assets/js/assemblyview";
import { useAssemblyDataStore } from "../../stores/assemblyStore";
import { PlusSquareOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";

let currnetShowSetData = ref<any>({});
const assemblyStore = useAssemblyDataStore();

const getCurrnetShowSetData = (changeId: number) => {
  // let id = changeId || assemblyStore.setId;
  let id = 1000;
  currnetShowSetData = viewstate.list.find((item: any) => {
    return item.id == id;
  });
};

const bgColorChange = (event: any) => {
  currnetShowSetData.option.bgColor = event.target.value;
};

const changeImg = (e: any, type: number) => {
  previewByReader(e.target.files[0], type);
};

const contactFileClick = (idName: string) => {
  let fileInput = document.getElementById(idName);
  fileInput?.click();
};

const previewByReader = (file: any, type: number) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (e: any) => {
    switch (type) {
      case 1:
        currnetShowSetData.option.bgSrc = e.target.result;
        break;
      case 2:
        currnetShowSetData.option.share.imgUrl = e.target.result;
        break;

      default:
        break;
    }
  };
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
