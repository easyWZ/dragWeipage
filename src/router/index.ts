import {
  createRouter,
  // createWebHistory,
  createWebHashHistory
} from "vue-router";
import Layout from "../views/Layout/index.vue";
const hash = createWebHashHistory();
const router = createRouter({
  history: hash,
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Layout,
      redirect:'/activity',
      children:[]
    },
    {
      path: "/assembly",
      name: "assembly",
      component: Layout,
      redirect:'/',
      children: [
        {
          path: "/activity",
          name: "activity",
          component: () => import("../views/assembly.vue"),
        },
      ]
    }
  ],
});

export default router;
