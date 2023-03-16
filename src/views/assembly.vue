<template>
  <div class="drag-content-wrap">
    <div class="drag-padding-wrap">
      <div class="left-item-wrap">
        <div class="top-title-mark">
          基础组件
          <!-- <span class="drag-use-symbol">拖拽使用</span> -->
          <div class="mark-wrap">
            <a-switch v-model:checked="isOpenDrag" />
            <a-tooltip placement="rightBottom">
              <template #title>
                <span>是否开启拖拽排序</span>
              </template>
              <QuestionCircleOutlined class="mg-5" />
            </a-tooltip>
          </div>
        </div>
        <div class="base-drag-wrap">
          <!--  :disabled="isOpenDrag" -->
          <draggable
            :group="{ name: 'assembly', put: false, pull: 'clone' }"
            :list="state.list"
            ghost-class="ghostClass"
            chosen-class="chosenClass"
            drag-class="dragClass"
            animation="200"
            @start="onLeftStart"
            @end="onLeftEnd"
            class="base-draggable-style"
            :sort="isOpenDrag"
            @clone="cloneData"
            filter=".undraggable"
          >
            <template #item="{ element, index }">
              <div
                class="item-box"
                :class="
                  element.undraggable || element.isMaxRepeat
                    ? 'undraggable'
                    : ''
                "
              >
                <!-- @click="checkItem(index)" -->
                <img
                  :src="element.checked ? element.acSrc : element.src"
                  alt=""
                  class="item-img"
                />
                <p class="item-title">{{ element.name }}</p>
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="center-item-wrap">
        <!-- 顶部配置 -->
        <div class="assembly-top-wrap">
          <component
            :allAssembly="viewstate.list"
            :assid="topId"
            :is="topSetComponent"
            @click="chooseMoudleToSet(viewstate.list[0], 0, false, 0)"
          />
          <div
            class="current-choose-this-border-box-show"
            v-show="currentCheckItem.id == topId"
          ></div>
        </div>
        <!-- 中间件-组件实时预览 -->
        <div
          class="drag-pre-view-wrap"
          :style="'background-color:' + viewstate.list[0].option?.bgColor"
        >
          <draggable
            :group="{ name: 'assembly', put: true, pull: false }"
            :list="viewstate.list"
            ghost-class="ghost"
            chosen-class="chosenClass"
            animation="300"
            @start="onStart"
            @end="onEnd"
            class="base-draggable-style"
            :style="viewstate.list.length <= 2 ? 'min-height:200px' : ''"
          >
            <template #item="{ element, index }">
              <div
                class="assembly-alone-view-wrap hover-gac"
                @mouseenter="showClose(element, true, index)"
                @mouseleave="showClose(element, false, index)"
                v-if="![topId, BottomId].includes(element.id)"
                @click="chooseMoudleToSet(element, index, false, 0)"
              >
                <!-- 页面居中实时预览-view -->
                <component
                  :allAssembly="viewstate.list"
                  :assid="element.id"
                  :is="element.component"
                />
                <!-- 显式 选中当前区域 -->
                <div
                  class="current-choose-this-border-box-show"
                  :showid="element.id"
                  :com="element.component"
                  v-show="currentCheckItem.id == element.id"
                ></div>
                <!-- 关闭图标 -->
                <div class="close-border" v-show="element.isShowClose">
                  <img
                    class="close-icon"
                    src="/img/icons/close_fill.png"
                    alt=""
                    @click.stop="removeThisAssembly(index)"
                  />
                </div>
              </div>
            </template>
          </draggable>
          <!-- 底部固定购买区域 -->
          <div class="assembly-bottom-wrap">
            <component
              :allAssembly="viewstate.list"
              :assid="BottomId"
              :is="justBuyComponent"
              @click="chooseMoudleToSet({}, 0, true, BottomId)"
            />
            <div
              class="current-choose-this-border-box-show"
              v-show="currentCheckItem.id == BottomId"
            ></div>
          </div>
        </div>
      </div>
      <!-- 模块配置 -->
      <div class="right-item-wrap">
        <p class="top-title-mark">
          模块配置
          <span class="drag-use-symbol">实时预览</span>
        </p>
        <div class="details-options-wrap">
          <div class="module-set-option">
            <!-- 顶部配置 -->
            <component
              :title="currentCheckItem.name"
              :is="setTop"
              v-if="currentCheckItem.unique == 'topset'"
            />
            <!-- kv配置 -->
            <component
              :sendThisItemData="currentCheckItem"
              :is="setKV"
              @changeWidth="getKvWidth"
              v-if="currentCheckItem.unique == 'kv'"
            />
            <!--  -->
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="save-wrap">
      <a-button class="mg-r-20">预览</a-button>
      <a-button type="primary">保存</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
// import { message } from "ant-design-vue";
import _ from "lodash";
import draggable from "vuedraggable";
import { useAssemblyDataStore } from "../stores/assemblyStore";

import setTop from "./assembly/set-top.vue";
import setKV from "./assembly/set-kv.vue";

import topSetComponent from "../views/preview/view-topset.vue";
import justBuyComponent from "../views/preview/view-justBuy.vue";

import { state, addRepeactAssembly } from "../assets/js/assemblydata";
import { viewstate } from "../assets/js/assemblyview";

const isOpenDrag = ref<boolean>(false); //是否开启拖拽排序
const currentCheckItem = ref({
  id: 1000,
  name: "",
  unique: "topset",
}); //当前中间组件选择
const topId = viewstate.list[0].id; //首页顶部设置id
const BottomId = 1004; // 立即购买区域对应id
const assemblyStore = useAssemblyDataStore(); //pinia

/**
 * 点击中间预览组件显示右侧配置
 * @param ele
 * @param index
 * @param selfCustom
 * @param selfId
 */
const chooseMoudleToSet = (
  ele: any,
  index: Number,
  selfCustom: boolean,
  selfId: Number
) => {
  if (selfCustom && selfId) {
    ele = viewstate.list.find((item) => {
      return item.id == selfId;
    });
  }
  currentCheckItem.value = ele;
  assemblyStore.setId = ele.id;
};

/**
 * 左侧组件不可拖拽条件
 * @param element
 */
const dealUndraggable = (element: any) => {
  let result = "";
  // 不可拖拽条件
  // 1.设定不可拖拽 undraggable
  // 2.一个页面该组件已达到最大复用数 repeatNumber
  let count = 0;
  viewstate.list.forEach((vl) => {
    if (vl.name == element.name) {
      count++;
    }
  });
  if (
    element.undraggable
    // || (element.repeatNumber && element.repeatNumber >= count)
  ) {
    result = "undraggable";
  }
  return result;
};

/**
 * 生命周期-onMounted
 */
onMounted(() => {
  // checkItem(0);
});

/**
 * 动态设置kv图样式
 * @param v
 */
const getKvWidth = (v: any) => {
  viewstate.list.forEach((item) => {
    if (item.id == 1001) {
      if (item?.option?.width) {
        item.option.width = v.value;
      }
    }
  });
};

// 删除
const removeThisAssembly = (index: number) => {
  viewstate.list.splice(index, 1);
};

// 克隆
const cloneData = (origin: any) => {};

const showClose = (ele: Object, isShow: boolean, index: number) => {
  (ele as any).isShowClose = isShow;
};

//拖拽开始的事件
const onLeftStart = (v: any) => {
  // console.log(v, "开始拖拽");
};

//拖拽结束的事件
const onLeftEnd = (obj: Object) => {
  (viewstate.list as any).forEach((elem: any, index: number) => {
    if (elem === viewstate.list[index + 1]) {
      // 解决componment加载问题
      addRepeactAssembly(elem.id, viewstate.list);
      viewstate.list.splice(index, 1);
    }
  });
};

//拖拽开始的事件
const onStart = (v: any) => {
  // console.log(v, "开始拖拽");
};

//拖拽结束的事件
const onEnd = () => {
  // console.log("结束拖拽");
};

// const checkItem = (index: number) => {
//   if (!state.list[index].checked) {
//     currentCheckItem.value = state.list[index];
//   }
//   state.list[index].checked = !state.list[index].checked;
// };

// const changeItem = (id: number) => {
//   (currentCheckItem as any).value = state.list.find((item) => {
//     return item.id == id;
//   });
// };
</script>
<style lang="scss" scoped>
@import "./scss/assembly.scss";
</style>
