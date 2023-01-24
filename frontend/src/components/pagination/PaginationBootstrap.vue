<template>
  <nav class="d-flex justify-content-between align-items-center">
    <ul class="pagination m-0">
      <li class="page-item" :class="currentPage === 1 ? 'disabled' : ''">
        <a class="page-link" @click.prevent="handlePageChange(1)"> « </a>
      </li>
      <li
        :key="page.number"
        v-for="page in pages"
        class="page-item"
        :class="page.disabled ? 'disabled' : ''"
      >
        <a class="page-link" @click.prevent="handlePageChange(page.number)">
          {{ page.number }}
        </a>
      </li>
      <li
        class="page-item"
        :class="currentPage === totalPages ? 'disabled' : ''"
      >
        <a class="page-link" @click.prevent="handlePageChange(totalPages)">
          »
        </a>
      </li>
    </ul>
    <div class="form-group">
      <label for="onPage">{{ label }}</label>
      <select
        class="form-select"
        name="onPage"
        id="onPage"
        @change="handleSelectChange"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  </nav>
</template>

<script>
export default {
  name: "PaginationBootstrap",
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }
      const startPage = this.currentPage - 3;

      return startPage <= 0 ? 1 : startPage;
    },
    pages() {
      const range = [];
      for (
        let i = this.startPage;
        i <= Math.min(this.currentPage + 3, this.totalPages);
        i++
      ) {
        range.push({
          number: i,
          disabled: i === this.currentPage,
        });
      }

      return range;
    },
  },
  methods: {
    handleSelectChange(e) {
      const query = { ...this.$route.query, perPage: e.target.value };
      this.$router.push({ query: query });
      this.$emit("pagination", query);
    },
    handlePageChange(page) {
      const query = { ...this.$route.query, page: page };
      this.$router.push({ query: query });
      this.$emit("pagination", query);
    },
  },
};
</script>

<style scoped>
label {
  width: fit-content;
}
</style>
