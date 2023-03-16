<template>
  <div class="layout-wrap">
    <!-- sideBar -->
    <component :is="sideBar" />
    <!-- content -->
    <div class="layout-content">
      <!-- layout-header -->
      <div class="layout-header-wrap"></div>
      <!-- layout-content -->
      <div class="layout-detail-content-wrap">
        <router-view slot="content"></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import sideBar from "./sideBar.vue";
</script>
<style lang="scss" scoped>
.layout-wrap {
  display: flex;
  overflow: hidden;
  height: 100%;
  .layout-content {
    flex: 1;
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    .layout-header-wrap {
      background-color: rgb(238, 238, 238);
      height: 20px;
      width: 100%;
    }
    .layout-detail-content-wrap {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
