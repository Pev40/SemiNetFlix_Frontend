import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Home,
  },
  {
    path: "/about-us",
    name: "Nosotros",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/movies",
    name: "Películas",
    component: () => import("../views/Movies.vue"),
  },
  {
    path: "/cartelera",
    name: "Cartelera",
    component: () => import("../views/Carteleras.vue"),
  },
  {
    path: "/authors",
    name: "Autores",
    component: () => import("../views/Authors.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin/dashboard",
    name: "AdminDashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/admin/user",
    name: "User",
    component: () => import("../views/admin/User.vue"),
  },
  {
    path: "/admin/movies",
    name: "AdminMovies",
    component: () => import("../views/admin/Movies.vue"),
  },
  {
    path: "/admin/reservas",
    name: "AdminReservas",
    component: () => import("../views/admin/Reservas.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const openRoutes = ["Login", "Inicio", "Nosotros", "Películas", "Carteleras"];
const adminRoutes = ["AdminMovies"];

router.beforeEach(async (to, from, next) => {
  await store.dispatch("getUser");
  console.log(
    "Route requested: ",
    to.name,
    store.getters.auth,
    store.getters.isAdmin
  );
  if (openRoutes.includes(to.name)) {
    if (store.getters.auth) {
      if (store.getters.isAdmin) next("/dashboard");
      else next();
    } else {
      next();
    }
  } else if (store.getters.auth) {
    if (adminRoutes.includes(to.name)) {
      if (!store.getters.isAdmin) next("/");
      else next();
    }
    next();
  } else {
    next("/");
  }
});

export default router;
