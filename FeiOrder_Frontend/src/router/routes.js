const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/Home",
        component: () => import("pages/ProfilePage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/Login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/Register",
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
