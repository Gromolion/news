<script>
import HeaderLink from "@/components/header/HeaderLink.vue";

export default {
  name: "GuestLinks",
  components: { HeaderLink },
};
</script>

<template>
  <ul class="navbar-nav">
    <HeaderLink route-name="login" route-text="Войти" />
    <HeaderLink route-name="register" route-text="Зарегистрироваться" />
  </ul>
</template>