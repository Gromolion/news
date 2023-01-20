<script>
import FilterPanel from "@/components/FilterPanel.vue";
import NewsItem from "@/components/news/NewsItem.vue";

export default {
  name: "NewsIndex",
  components: { NewsItem, FilterPanel },
  data() {
    return {
      auth: true,
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
  created() {
    document.title = "Новости Дона";
  },
};
</script>

<template>
  <!--    <div v-if="" class="alert alert-primary text-center mt-2" role="alert">-->
  <!--      {{ Session::get('success') }}-->
  <!--    </div>-->
  <div v-if="auth" class="d-flex justify-content-center m-5">
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
