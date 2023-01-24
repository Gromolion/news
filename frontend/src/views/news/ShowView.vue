<script>
import axios from "axios";
import { assets } from "@/helpers/assets-path";

export default {
  name: "ShowView",
  methods: {
    assets,
    formatDate(date) {
      date = new Date(Date.parse(date));
      const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
        date
      );
      const month = new Intl.DateTimeFormat("en", { month: "2-digit" }).format(
        date
      );
      const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
        date
      );
      const hours = new Intl.DateTimeFormat("en", { hour: "2-digit", hour12: false }).format(
        date
      );
      const minutes = new Intl.DateTimeFormat("en", {
        minute: "2-digit",
      }).format(date);
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
  data() {
    return {
      canUpdate: true,
      newsItem: null,
    };
  },
  created() {
    axios({
      url: "/api/news/" + this.$route.params.id,
      method: "GET",
    }).then((res) => (this.newsItem = res.data));
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
