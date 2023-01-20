<script>
export default {
  props: ["routeName", "routeParams", "routeText"],
  name: "HeaderLink",
};
</script>

<template>
  <li class="nav-item">
    <RouterLink class="nav-link" :to="{ name: routeName }">{{ routeText }}</RouterLink>
  </li>
</template>