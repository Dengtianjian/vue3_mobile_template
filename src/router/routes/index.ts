import { RouteRecordRaw } from "vue-router";

const modules = import.meta.globEager("./modules/*.ts");

const routes: RouteRecordRaw[] = [];

Object.keys(modules).forEach(key => {
  const defaultModule = modules[key].default;
  if (!defaultModule) return;
  if (Array.isArray(defaultModule)) {
    routes.push(...defaultModule);
  } else {
    routes.push(defaultModule);
  };
})

export default routes;