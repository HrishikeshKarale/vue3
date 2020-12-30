import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/toDoApp",
    name: "toDoApp",
    // route level code-splitting
    // this generates a separate chunk (toDoApp.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "toDoApp" */ "../views/toDoApp/index.vue")
  },
  {
    path: "/calendar",
    name: "calendar",
    // route level code-splitting
    // this generates a separate chunk (calendar.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "calendar" */ "../views/calendar/index.vue")
  },
  {
    path: "/markdown",
    name: "markdown",
    // route level code-splitting
    // this generates a separate chunk (markdown.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "markdown" */ "../views/markdown/index.vue")
  },
  {
    path: "/slider",
    name: "slider",
    // route level code-splitting
    // this generates a separate chunk (slider.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "slider" */ "../views/slider/index.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // scrollBehavior(to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
  routes
});

export default router;
