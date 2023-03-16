<template>
  <div class="side-bar-wrap">
    <div class="header-personal-info-wrap">
      <img src="/img/common/header.png" alt="" />
      <span class="personal-info">车享</span>
    </div>
    <a-menu
      style="width: 220px"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      :theme="theme"
    >
      <a-menu-item key="1">
        <template #icon>
          <ProfileOutlined />
        </template>
        活动页配置
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <CalendarOutlined />
        </template>
        待开发配置
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>一级菜单</template>
        <a-menu-item key="3">二级配置</a-menu-item>
        <a-menu-item key="4">二级配置</a-menu-item>
        <a-sub-menu key="sub1-2" title="二级配置">
          <a-menu-item key="5">三级配置</a-menu-item>
          <a-menu-item key="6">三级配置</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <SettingOutlined />
        </template>
        <template #title>设置</template>
        <a-menu-item key="7">权限管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import {
  ProfileOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  setup() {
    const state = reactive({
      theme: "light",
      selectedKeys: ["1"],
      openKeys: ["sub1", "sub2"],
    });
    const changeTheme = (checked: boolean) => {
      state.theme = checked ? "dark" : "light";
    };

    return {
      ...toRefs(state),
      changeTheme,
    };
  },
  components: {
    ProfileOutlined,
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined,
  },
});
</script>
<style lang="scss" scoped>
.side-bar-wrap {
  .header-personal-info-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      margin: 60px 0;
    }
    .personal-info {
      margin-bottom: 30px;
    }
  }
}
</style>
