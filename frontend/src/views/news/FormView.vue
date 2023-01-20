<script>
import FormInput from "@/components/forms/FormInput.vue";
import FormTextarea from "@/components/forms/FormTextarea.vue";
import router from "@/router";

export default {
  name: "NewsForm",
  methods: {
    router() {
      return router;
    },
  },
  components: { FormTextarea, FormInput },
  data() {
    return {
      header: null,
      announce: null,
      description: null,
      errors: {
        header: null,
        announce: null,
        description: null,
        image: null,
      },
      update: false,
    };
  },
};
</script>

<template>
  <form method="post">
    <FormInput
      name="header"
      label="Заголовок"
      placeholder="Введите заголовок"
      :value="header"
      :error="errors.header"
    />
    <FormInput
      name="announce"
      label="Анонс"
      placeholder="Введите анонс"
      :value="announce"
      :error="errors.announce"
    />
    <FormInput
      name="image"
      type="file"
      label="Загрузите картинку(jpeg, gif)"
      :error="errors.image"
    />
    <FormTextarea
      name="description"
      class="mb-4"
      label="Текст новости"
      rows="20"
      placeholder="Введите текст новости"
      :value="description"
      :error="errors.description"
    />

    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-primary px-5">
        {{ update ? "Обновить новость" : "Предложить новость" }}
      </button>
    </div>
  </form>
</template>
