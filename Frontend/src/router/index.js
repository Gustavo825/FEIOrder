import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);
import store from "../store";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/notas",
    name: "notas",
    component: () => import("../views/NotasView.vue"),
    meta: { requireAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  const route = to.matched.some((record) => record.meta.requireAuth);
  if (route && store.state.token === "") {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
