<script>
import HeaderLink from "@/components/header/HeaderLink.vue";
import GuestLinks from "@/components/header/GuestLinks.vue";
import UserLinks from "@/components/header/UserLinks.vue";
import axios from "axios";
import { formatDate } from "../../helpers/format-date";

export default {
  name: "HeaderSection",
  components: { UserLinks, GuestLinks, HeaderLink },
  data() {
    return {
      lastNews: null,
      isAdmin: true,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    newsHeader() {
      return this.lastNews.header.length > 10
        ? this.lastNews.header.slice(0, 10) + "..."
        : this.lastNews.header;
    },
  },
  created() {
    axios({
      url: "/api/news/last",
      method: "GET",
    }).then((res) => (this.lastNews = res.data[0]));
  },
  methods: {
    formatDate,
  },
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-2 px-5">
      <div class="container">
        <RouterLink class="navbar-brand" :to="{ name: 'news.index' }">
          Новости Дона
        </RouterLink>
        <div
          class="collapse navbar-collapse d-flex justify-content-between"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <HeaderLink route-name="news.index" route-text="Главная" />
            <li class="nav-item" v-if="lastNews">
              <span class="nav-link">
                Последняя добавленная новость:
                <RouterLink
                  :to="{ name: 'news.show', params: { id: lastNews.id } }"
                >
                  {{ formatDate(lastNews.created_at) }} — {{ newsHeader }}
                </RouterLink>
              </span>
            </li>
          </ul>
          <UserLinks v-if="user" :is-admin="isAdmin" />
          <GuestLinks v-else />
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>
