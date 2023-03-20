import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import { resolve } from'path'// 主要用于alias文件路径别名

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("/src", import.meta.url)),
    },
  },
  server: {
    hmr: true,
    //vue3 vite配置热更新不用手动刷新
    // host: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/common.scss";`, // 此处全局的scss文件
      },
    },
  },
  build: {
    // lib: {
    // entry: resolve(__dirname, "src/main.ts"), // 设置入口文件
    // name: "nf-tool", // 起个名字，安装、引入用
    // fileName: (format) => `nf-tool.${format}.js`, // 打包后的文件名
    // },
    chunkSizeWarningLimit: 1500,
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes("node_modules")) {
    //         return id
    //           .toString()
    //           .split("node_modules/.pnpm/")[1]
    //           .split("/")[0]
    //           .toString();
    //       }
    //     },
    //   },
    // },
  },
});
