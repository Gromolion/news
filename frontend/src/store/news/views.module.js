import { viewsService } from "@/services/views.service";

export const views = {
  namespaced: true,
  actions: {
    // eslint-disable-next-line no-unused-vars
    view({ dispatch, commit }, { newsId, viewsNow, user }) {
      if (user && !localStorage.getItem(newsId + "_viewed"))
        viewsService.setViewed(newsId, viewsNow, user).then((res) => {
          commit("viewed", res.data);
        });
    },
  },
  mutations: {
    viewed(state, newsId) {
      localStorage.setItem(newsId + "_viewed", true);
    },
  },
};
