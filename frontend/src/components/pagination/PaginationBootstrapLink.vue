<template>
  <li class="page-item">
    <a
        v-if="page !== 1"
        class="page-link"
        @click.prevent="$emit('')"
        href="#"
    >
      Предыдущая
    </a>
  </li>
</template>

<script>
export default {
  name: "PaginationBootstrapLink",
};
</script>