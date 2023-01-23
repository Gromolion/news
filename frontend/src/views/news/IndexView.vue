<script>
import FilterPanel from "@/components/FilterPanel.vue";
import NewsItem from "@/components/news/NewsItem.vue";

export default {
  name: "NewsIndex",
  components: { NewsItem, FilterPanel },
  data() {
    return {
      news: [
        {
          id: 1,
          image: false,
          created_at: "12.09.2003",
          header: "ass",
          announce: "ass",
          views: "1",
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    document.title = "Новости Дона";
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
  <div class="d-flex justify-content-center">
    <!-- {{ $news->onEachSide(3)->appends($_GET)->links() }} -->
  </div>
</template>
