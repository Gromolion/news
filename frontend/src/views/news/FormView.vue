<script>
import FormInput from "@/components/forms/FormInput.vue";
import FormTextarea from "@/components/forms/FormTextarea.vue";

export default {
  name: "NewsForm",
  components: { FormTextarea, FormInput },
  data() {
    return {
      header: null,
      announce: null,
      description: null,
      image: null,
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
      v-model="header"
      :error="errors.header"
    />
    <FormInput
      name="announce"
      label="Анонс"
      placeholder="Введите анонс"
      v-model="announce"
      :error="errors.announce"
    />
    <FormInput
      name="image"
      type="file"
      label="Загрузите картинку(jpeg, gif)"
      v-model="image"
      :error="errors.image"
    />
    <FormTextarea
      name="description"
      class="mb-4"
      label="Текст новости"
      rows="20"
      placeholder="Введите текст новости"
      v-model="description"
      :error="errors.description"
    />

    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-outline-primary px-5">
        {{ update ? "Обновить новость" : "Предложить новость" }}
      </button>
    </div>
  </form>
</template>
