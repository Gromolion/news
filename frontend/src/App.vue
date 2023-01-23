<script>
import HeaderSection from "./components/header/HeaderSection.vue";

export default {
  components: { HeaderSection },
  name: "app",
  computed: {
    alert() {
      return this.$store.state.alert;
    },
  },
  watch: {
    $route() {
      this.$store.dispatch("alert/clear");
    },
  },
};
</script>

<template>
  <div v-if="alert.message" :class="`alert ${alert.type}`" role="alert">
    <div v-if="typeof alert.message === Array">
      <ul class="mb-0" v-for="msg in alert.message" :key="msg">
        <li>{{ msg }}</li>
      </ul>
    </div>
    <div v-else>{{ alert.message }}</div>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  <HeaderSection />
  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.alert {
  position: absolute;
  display: flex;
  max-width: 400px;
  right: 10px;
  top: 10px;
  z-index: 1000;
  gap: 10px;
}
</style>
