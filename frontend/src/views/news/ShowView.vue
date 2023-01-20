<script>
export default {
  name: "ShowView",
  data() {
    return {
      canUpdate: true,
      newsItem: {
        id: 1,
        image: false,
        created_at: "12.09.2003",
        header: "ass",
        announce: "ass",
        description: "ass",
        views: "1",
      },
    };
  },
};
</script>

<template>
  <div class="bg-light m-5 p-4 rounded">
    <h1 class="text-center mb-4">
      {{ newsItem.created_at }} - {{ newsItem.header }}
    </h1>
    <div class="d-flex">
      <div>
        <img v-if="newsItem.image" :src="newsItem.image" alt="" />
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
