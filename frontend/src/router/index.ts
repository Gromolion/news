import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/news/IndexView.vue";
import FormView from "@/views/news/FormView.vue";
import ShowView from "@/views/news/ShowView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "news.index",
      component: IndexView,
    },
    {
      path: "/news/create",
      name: "news.create",
      component: FormView,
    },
    {
      path: "/news/:id",
      name: "news.show",
      component: ShowView,
    },
    {
      path: "/login",
      name: "login",
      component: IndexView,
    },
    {
      path: "/register",
      name: "register",
      component: IndexView,
    },
    {
      path: "/admin",
      name: "admin.index",
      component: IndexView,
    },
    {
      path: "/profile",
      name: "profile",
      component: IndexView,
    },
  ],
});

export default router;
