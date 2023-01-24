<template>
  <div class="bg-light d-flex justify-content-between my-3 rounded p-4">
    <div>
      <p>Имя пользователя: {{ user.name }}</p>
      <p>Общее количество просмотров новостей: {{ 0 }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileShow",
  data() {
    return {
      user: null,
    };
  },
  created() {
    document.title = "Профиль";
    const id = this.$route.params.id;
    if (id) {
      axios({
        url: "/api/user/" + id,
        method: "GET",
      }).then((res) => (this.user = res.data));
    } else {
      this.user = this.$store.state.auth.user;
    }
  },
};
</script>

<style scoped></style>
