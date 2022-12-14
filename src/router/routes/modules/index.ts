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
          title: "้ฆ้กต"
        },
      },
      {
        name: "member",
        path: "my",
        component: () => import("../../../views/Member/index.vue"),
        meta: {
          title: "ๆ็"
        },
      }
    ]
  }
] as RouteRecordRaw[]