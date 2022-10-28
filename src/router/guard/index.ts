import { Router } from "vue-router";

function pageGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // TODO 页面校验权限
    if (to.meta.title) {
      document.title = to.meta.title as string //*+ " · " + config.name;
    }

    next();
  });
}

export default function (router: Router) {
  pageGuard(router);
}