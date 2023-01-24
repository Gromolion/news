<script>
export default {
  name: "FilterPanel",
  props: {},
  data() {
    return {
      sort: null,
      search: null,
    };
  },
  created() {
    this.sort = this.$route.query.sort;
    this.search = this.$route.query.search;
  },
  methods: {
    handleSubmit() {
      const query = { ...this.$route.query, sort: this.sort, search: this.search };
      this.$router.push({ query: query });
      this.$emit("filter", query);
    },
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit" method="GET" class="mt-4">
    <div class="d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <label for="sort" style="white-space: nowrap">Сортировать по</label>
        <select
          v-model="sort"
          class="form-select sort mx-2"
          name="sort"
          id="sort"
        >
          <option value="views ASC" :selected="sort === 'views ASC'">
            возрастанию просмотров
          </option>
          <option value="views DESC" :selected="sort === 'views DESC'">
            убыванию просмотров
          </option>
          <option value="created_at ASC" :selected="sort === 'created_at ASC'">
            возрастанию даты
          </option>
          <option
            value="created_at DESC"
            :selected="sort === 'created_at DESC'"
          >
            убыванию даты
          </option>
        </select>
        <button type="submit" class="btn btn-outline-primary">
          Сортировать
        </button>
      </div>
      <div class="d-flex">
        <input
          class="form-control me-2"
          name="search"
          type="search"
          placeholder="Поиск"
          aria-label="Поиск"
          v-model="search"
        />
        <button class="btn btn-outline-primary">Найти</button>
      </div>
    </div>
  </form>
</template>
