import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useUserStore } from "src/stores/use-store";
export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const userStore = useUserStore();
    const requiredAuth = to.meta.auth;
    if (userStore.token) {
      return next();
    }
    if (requiredAuth || localStorage.getItem("user")) {
      await userStore.refreshToken();
      if (userStore.token) {
        return next();
      }
      return next("/Login");
    }
    next();
  });
  return Router;
});