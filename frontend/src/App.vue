<script lang="ts">
import HeaderSection from "@/components/header/HeaderSection.vue";

export default {
  components: { HeaderSection },
  data() {
    return {};
  },
};
</script>

<template>
  <HeaderSection />
  <div class="container">
    <RouterView />
  </div>

</template>
