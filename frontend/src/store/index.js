import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { auth } from "@/store/auth/auth.module";
import { alert } from "@/store/alert/alert.module";

export const store = createStore({
  plugins: [createPersistedState()],
  modules: {
    alert,
    auth,
  },
});
