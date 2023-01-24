import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { auth } from "@/store/auth/auth.module";
import { alert } from "@/store/alert/alert.module";
import { views } from "@/store/news/views.module";

export const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    alert,
    auth,
    views,
  },
});
