<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- :before-upload="beforeUpload" -->
  <!-- action="https://www.mocky.io/v2/5cc8019d300000980a055e76" -->
  <div class="alone-item-set-wrap">
    <!-- 标题 -->
    <!-- <div class="title-set-part">{{ currnetShowSetData.name }}-配置</div> -->
    <!-- 选项配置 -->
  <!-- <div class="option-wrap">
      <section class="left-container"></section>
      <section class="right-container"></section>
                        </div> -->
    <!--  -->
    <div class="option-wrap">
      <section class="left-container">上传图片</section>
      <section class="right-container">
        <!--  -->
        <div class="upload-img-wrap">
          <div class="show-file-wrap">
            <img class="file-img-show" @click="contactFileClick('fileInput')" :src="currnetShowSetData.option.src"
              alt="" />
            <div class="deal-empty-img" @click="contactFileClick('fileInput')" v-show="!currnetShowSetData.option.src">
              <PlusCircleOutlined class="add-css" />
            </div>
          </div>
          <input id="fileInput" class="file-upload-input" type="file" @change="changeImg($event, 1)" />
        </div>
      </section>
    </div>
    <!--  -->
  <!-- <div class="option-wrap">
      <section class="left-container">上传图片</section>
      <section class="right-container">
        <section class="r-c-left-wrap">
          <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="http://localhost:80/file.php"
            :headers="{
              'Access-Control-Allow-Origin': '*',
            }"
            :supportServerRender="true"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </section>
        <span class="right-box-remark">可灵活设置大小</span>
      </section>
                        </div> -->
    <!-- 宽度设置 -->
    <div class="option-wrap">
      <section class="left-container">宽度设置</section>
      <section class="right-container">
        <div class="r-c-right-wrap">
          <a-row>
            <a-col :span="20">
              <a-slider v-model:value="currnetShowSetData.option.width" :min="50" :max="100" :step="10" />
            </a-col>
            <a-col :span="4">
              <a-input-number v-model:value="currnetShowSetData.option.width" :formatter="(value: any) => `${value}%`"
                :min="50" :max="100" :step="10" style="margin-left: 0.16rem" />
            </a-col>
          </a-row>
        </div>
      </section>
    </div>
    <!-- 是否唯一 -->
  </div>
</template>
<script lang="ts" setup>
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref, watch } from "vue";
import { useAssemblyDataStore } from "../../stores/assemblyStore";

const assemblyStore = useAssemblyDataStore();
let currnetShowSetData = ref<any>({});
watch(
  () => assemblyStore.setId,
  (id: number, oldId) => {
    currnetShowSetData = assemblyStore.getCurrnetShowSetData();
  },
  { immediate: true }
);

const contactFileClick = (idName: string) => {
  let fileInput = document.getElementById(idName);
  fileInput?.click();
};

const changeImg = (e: any, type: number) => {
  previewByReader(e.target.files[0], type);
};

const previewByReader = (file: any, type: number) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = (e: any) => {
    currnetShowSetData.option.src = e.target.result;
  };
};

// const emit = defineEmits(["changeWidth"]);
// const changeWidth = () => {
//   //传递给父组件
//   // emit("changeWidth", kvWidth);
//   let id = assemblyStore.setId;
//   let currentAssemblyData: any = viewstate.list.find((item: any) => {
//     return item.id == id;
//   });
// };
// 
let fileList = ref([]);
let loading = ref<boolean>(false);
let imageUrl = ref<string>("./img/item/kv-1.jpg");

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
  type?: string;
  size: number;
  originFileObj: any;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const handleChange = (info: FileInfo) => {
  if (info.file.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file.status === "done") {
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

// const beforeUpload = (file: FileItem) => {
//   const isJpgOrPng =
//     file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };
</script>
<style lang="scss" scoped>
@import "../scss/set-kv.scss";
</style>
