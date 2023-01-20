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
};
</script>

<template>
  <form method="GET" class="mt-4">
    <div class="d-flex justify-content-between">
      <div>
        <label for="sort">Сортировать по</label>
        <select name="sort" id="sort" class="sort">
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
          :value="search"
        />
        <button class="btn btn-outline-primary" type="submit">Найти</button>
      </div>
    </div>
  </form>
</template>
