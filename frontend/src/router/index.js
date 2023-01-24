import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import NewsIndex from "@/views/news/NewsIndex.vue";
import NewsForm from "@/views/news/NewsForm.vue";
import NewsShow from "@/views/news/NewsShow.vue";
import ProfileShow from "@/views/profile/ProfileShow.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "news.index",
      component: NewsIndex,
    },
    {
      path: "/news/create",
      name: "news.create",
      component: NewsForm,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/news/:id",
      name: "news.show",
      component: NewsShow,
    },
    {
      path: "/news/:id/update",
      name: "news.update",
      component: NewsForm,
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      name: "admin.index",
      component: NewsIndex,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile/:id?",
      name: "profile",
      component: ProfileShow,
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
