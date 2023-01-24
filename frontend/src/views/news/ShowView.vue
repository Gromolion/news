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
      canUpdate: false,
      newsItem: null,
    };
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
      {{ formatDate(newsItem.created_at) }} - {{ newsItem.header }}
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
          <a href="">{{ newsItem.user.name }}</a>
        </p>
      </div>
      <div class="p-5">{{ newsItem.description }}</div>
    </div>
    <div v-if="canUpdate" class="d-flex justify-content-end">
      <a class="btn btn-primary" href="">Обновить новость</a>
    </div>
  </div>
</template>

<style scoped>
img {
  max-width: 300px;
}
</style>
