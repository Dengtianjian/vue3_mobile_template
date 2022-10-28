import { RouteRecordRaw } from "vue-router";

export default [
  {
    name: "index",
    path: "/",
    component: () => import("../../../layouts/DefaultLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("../../../views/home.vue"),
        meta: {
          title: "首页"
        },
      },
      {
        name: "member",
        path: "my",
        component: () => import("../../../views/Member/index.vue"),
        meta: {
          title: "我的"
        },
      }
    ]
  }
] as RouteRecordRaw[]