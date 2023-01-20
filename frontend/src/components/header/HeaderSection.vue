<script>
import HeaderLink from "@/components/header/HeaderLink.vue";
import GuestLinks from "@/components/header/GuestLinks.vue";
import UserLinks from "@/components/header/UserLinks.vue";

export default {
  name: "HeaderSection",
  components: {UserLinks, GuestLinks, HeaderLink },
  data() {
    return {
      newsExist: true,
      isGuest: false,
      isAdmin: true,
    };
  },
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light py-2 px-5">
      <div class="container">
        <RouterLink class="navbar-brand" :to="{ name: 'news.index' }">
          Новости Дона
        </RouterLink>
        <div
          class="collapse navbar-collapse d-flex justify-content-between"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <HeaderLink route-name="news.index" route-text="Главная" />
            <li class="nav-item" v-if="newsExist">
              <span class="nav-link">
                Последняя добавленная новость: {{ newsExist }}
              </span>
            </li>
          </ul>
          <GuestLinks v-if="isGuest" />
          <UserLinks v-else :is-admin="isAdmin" />
        </div>
      </div>
    </nav>
  </header>
</template>
