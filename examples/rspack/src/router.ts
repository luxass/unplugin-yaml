import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./pages/import-as-module.vue"),
    },
    {
      path: "/raw-import",
      component: () => import("./pages/raw-import.vue"),
    },
  ],
});
