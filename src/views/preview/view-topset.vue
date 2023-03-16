<template>
  <div class="top-img hover-gac">
    <img src="/img/top.png" alt="" />
    <div class="page-title-wrap">
      <p>{{ (viewstate as any).list[0].option.title }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { viewstate } from "../../assets/js/assemblyview";
</script>
<style lang="scss" scoped>
.top-img {
  width: 100%;
  height: 64px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
  .page-title-wrap {
    position: absolute;
    top: 18px;
    width: 100%;
    height: 100%;
    @include flexCenter;
  }
}

.hover-gac {
  &:hover {
    @include onePxBorder;
    cursor: pointer;
  }
}
</style>
