import { createRouter, createWebHashHistory } from "vue-router";
import routerGuard from "./guard";

import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

routerGuard(router);

export default router