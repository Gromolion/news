<script>
import HeaderLink from "@/components/header/HeaderLink.vue";

export default {
  props: ["isAdmin"],
  name: "UserLinks",
  components: { HeaderLink },
};
</script>

<template>
  <ul class="navbar-nav">
    <HeaderLink
      v-if="isAdmin"
      route-name="admin.index"
      route-text="Админ-панель"
    />
    <HeaderLink route-name="profile" route-text="Профиль" />
    <!--            <HeaderLink route-name="logout" route-text="Выйти" />-->
  </ul>
</template>
