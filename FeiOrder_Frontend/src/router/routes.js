const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/Profile",
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
      {
        path: "/Menu",
        component: () => import("pages/MenuPage.vue"),
      },
      {
        path: "/RegisterDish",
        component: () => import("pages/RegisterDishPage.vue"),
        meta: {
          auth: true,
          verifyRol: true,
        },
      },
      {
        path: "/UpdateUser",
        component: () => import("pages/UpdateProfilePage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/ShoppingCart",
        component: () => import("pages/ShoppingPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "/Orders",
        name: "orders",
        component: () => import("pages/OrdersPage.vue"),
      },
      {
        path: "/dishMenu",
        name: "dishMenu",
        component: () => import("pages/DishMenu.vue"),
        meta: {
          auth: true,
          verifyRol: true,
        },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
