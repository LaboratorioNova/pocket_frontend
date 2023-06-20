import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
  },
  {
    path: "/inicio",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  
  {
    path: "/password-recover",
    name: "Password-recover",
    component: () => import("../views/PasswordRecover.vue"),
  },
  {
    path: "/password-reset/:token",
    name: "Password-reset",
    component: () => import("../views/PasswordReset.vue"),
  },
  {
    path: "/usuarios",
    name: "Users",
    component: () => import("../views/Users.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/estudios",
    name: "Studies",
    component: () => import("../views/Studies.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/citas",
    name: "Appointments",
    component: () => import("../views/appointment/Appointments.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/citas/crear-cita",
    name: "CreateAppointment",
    component: () => import("../views/appointment/AppointmentDetail.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/citas/detalle-cita/:id",
    name: "AppointmentDetail",
    component: () => import("../views/appointment/AppointmentDetail.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/configuracion-rutas",
    name: "ScheduleConfig",
    component: () => import("../views/ScheduleConfig.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/reportes",
    name: "Reports",
    component: () => import("../views/Reports.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    name: "404",
    component: () => import("../views/State404.vue"),
    meta: {
      title: "URL no encontrada",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some((route) => route.meta.requiresAuth);

  // Si el usuario esta loggeado y la pantalla no requiere autenticación redirigirlo a la sección de inicio del Dashboard.
  if (!requiresAuth && store.state.auth.loggedIn) {
    next("/inicio");
  }
  // Si la url requiere autenticarse y el usuario no esta loggeado, redirigir al login.
  else if (requiresAuth && !store.state.auth.loggedIn) {
    next("/");
  }
  // Si no pasa ningúna de las dos situaciones anteriores dejarlo avanzar en la sección que el usuario esta.
  else {
    next();
  }
});
export default router;
