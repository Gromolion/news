import { userService } from "@/services/user.service";
import router from "@/router";

export const auth = {
  namespaced: true,
  actions: {
    login({ dispatch, commit }, { name, password }) {
      userService.login(name, password).then(
        (user) => {
          commit("loginSuccess", user);
          router.push("/");
        },
        (error) => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    register({ dispatch }, { name, password, repeatedPassword }) {
      userService.register(name, password, repeatedPassword).then(
        () => {
          router.push("/login");
        },
        (error) => {
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    logout({ dispatch, commit }) {
      userService.logout();
      commit("logout");
      router.push("/");
      dispatch("alert/success", "Вы вышли", { root: true });
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    loginFailure(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
};
