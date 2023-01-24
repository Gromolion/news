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
      page: null,
      perPage: null,
      search: null,
      sort: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    totalPages() {
      return Math.ceil(this.totalCount / this.perPage);
    },
  },
  created() {
    document.title = "Новости Дона";
    const query = this.$route.query;
    this.loadNews({
      page: query.page ?? 1,
      perPage: query.perPage ?? 5,
    });
  },
  methods: {
    loadNews(query = {}) {
      if (query.page) this.page = query.page;
      if (query.perPage) this.perPage = query.perPage;
      if (query.sort) this.sort = query.sort;
      this.search = query.search;
      axios({
        url: "/api/news",
        method: "GET",
        params: {
          page: this.page,
          perPage: this.perPage,
          sort: this.sort,
          search: this.search,
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
  <FilterPanel @filter="loadNews" />
  <NewsItem v-for="newsItem in news" :key="newsItem.id" :news="newsItem" />
  <PaginationBootstrap
    label="Новостей на странице"
    :total-pages="totalPages"
    :per-page="+perPage"
    :current-page="+page"
    @pagination="loadNews"
  />
</template>
