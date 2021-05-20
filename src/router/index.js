import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Socios from "../views/Socios.vue";
import Canchas from "../views/Canchas.vue";
import Reservas from "../views/Reservas.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Socios",
    name: "Socios",
    component: Socios,
  },
  {
    path: "/Reservas",
    name: "Reservas",
    component: Reservas,
  },
  {
    path: "/Canchas",
    name: "Canchas",
    component: Canchas,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
