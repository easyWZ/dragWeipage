import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
// 初始化样式引入
import "/src/assets/css/reset.scss";
// rem适配
import "/src/assets/js/rem.ts";

//引入ant-design全部组件及样式
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

//注册全部组件

const app = createApp(App);

app.use(Antd);
app.use(createPinia());
app.use(router);

app.mount("#app");
