<script>
import axios from "axios";
import { assets } from "@/helpers/assets-path";
import { formatDate } from "@/helpers/format-date";

export default {
  name: "ShowView",
  methods: {
    formatDate,
    assets,
  },
  data() {
    return {
      newsItem: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
    canUpdate() {
      return this.user && this.user.id === this.newsItem.user.id;
    },
  },
  created() {
    axios({
      url: "/api/news/" + this.$route.params.id,
      method: "GET",
    }).then((res) => {
      this.newsItem = res.data;
      document.title = this.newsItem.header;
    });
  },
};
</script>

<template>
  <div class="bg-light m-5 p-4 rounded">
    <h1 class="text-center mb-4">
      {{ formatDate(newsItem.created_at) }} — {{ newsItem.header }}
    </h1>
    <div class="d-flex">
      <div>
        <img
          v-if="newsItem.image_path"
          :src="assets(newsItem.image_path)"
          alt=""
        />
        <p v-if="newsItem.user" class="">
          Предложена:
          <RouterLink :to="{ name: 'profile', params: { id: newsItem.user.id } }">
            {{ newsItem.user.name }}
          </RouterLink>
        </p>
      </div>
      <div class="p-5">{{ newsItem.description }}</div>
    </div>
    <div v-if="canUpdate" class="d-flex justify-content-end">
      <RouterLink :to="{ name: 'news.update', params: { id: newsItem.id } }">
        <p class="btn btn-primary">Обновить новость</p>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 300px;
}
</style>
