import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/news/IndexView.vue";
import FormView from "@/views/news/FormView.vue";
import ShowView from "@/views/news/ShowView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";

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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/news/:id",
      name: "news.show",
      component: ShowView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/logout",
      name: "logout",
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("user")) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!localStorage.getItem("user")) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
