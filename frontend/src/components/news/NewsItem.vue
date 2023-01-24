<script>
export default {
  name: "NewsItem",
  props: ["news"],
};
</script>

<template>
  <div class="bg-light d-flex my-3 rounded p-4">
    <img
      v-if="news.image_path"
      :src="'/api/' + news.image_path"
      alt=""
    />
    <div class="p-3 w-100">
      <RouterLink :to="{ name: 'news.show', params: { id: news.id } }">
        <h1>{{ news.created_at }} — {{ news.header }}</h1>
      </RouterLink>
      <div>{{ news.announce }}</div>
      <div class="d-flex justify-content-end mt-5">
        <div>Просмотров: {{ news.views }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 300px;
}
</style>
