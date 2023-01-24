<script>
import FilterPanel from "@/components/FilterPanel.vue";
import NewsItem from "@/components/news/NewsItem.vue";
import axios from "axios";
import PaginationBootstrap from "@/components/pagination/PaginationBootstrap.vue";

export default {
  name: "NewsIndex",
  components: { PaginationBootstrap, NewsItem, FilterPanel },
  data() {
    return {
      news: [],
      totalCount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    page() {
      return this.$route.query.page ?? 1;
    },
    perPage() {
      return this.$route.query.perPage ?? 5;
    },
    totalPages() {
      return Math.ceil(this.totalCount / this.perPage);
    },
  },
  created() {
    document.title = "Новости Дона";
    this.loadNews({ page: this.page, perPage: this.perPage });
  },
  methods: {
    loadNews(query) {
      axios({
        url: "/api/news",
        method: "GET",
        params: {
          page: query.page,
          perPage: query.perPage,
        },
      }).then((res) => {
        this.news = res.data.news;
        this.totalCount = res.data.count;
      });
    },
  },
};
</script>

<template>
  <div v-if="user" class="d-flex justify-content-center m-5">
    <RouterLink :to="{ name: 'news.create' }" class="btn btn-primary px-5">
      Предложить новость
    </RouterLink>
  </div>
  <FilterPanel />
  <NewsItem v-for="newsItem in news" :key="newsItem.id" :news="newsItem" />
  <PaginationBootstrap
    label="Новостей на странице"
    :total-pages="totalPages"
    :per-page="+perPage"
    :current-page="+page"
    @pagination="loadNews"
  />
</template>
