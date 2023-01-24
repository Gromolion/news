<script>
import FormInput from "@/components/forms/FormInput.vue";
import FormTextarea from "@/components/forms/FormTextarea.vue";
import axios from "axios";
import FileUpload from "@/components/forms/FileUpload.vue";
import { authHeader } from "@/helpers/auth-headers";
import router from "@/router";

export default {
  name: "NewsForm",
  components: { FileUpload, FormTextarea, FormInput },
  data() {
    return {
      header: null,
      announce: null,
      description: null,
      image: null,
      update: false,
      id: null,
    };
  },
  methods: {
    handleSubmit() {
      const formData = new FormData();
      formData.append("header", this.header);
      formData.append("announce", this.announce);
      formData.append("description", this.description);
      if (this.image) formData.append("image", this.image);

      let url = "/api/news/",
        method = "POST";

      if (this.update) {
        url += this.id;
        method = "PATCH";
      }

      axios({
        url: url,
        method: method,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: authHeader(this.auth.user),
        },
      })
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          const { dispatch } = this.$store;
          dispatch("alert/error", err.message, { root: true });
        });
    },
    handleFileUpload(file) {
      this.image = file;
    },
  },
  computed: {
    auth() {
      return this.$store.state.auth;
    },
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.update = true;
      document.title = "Обновить новость";
      this.id = id;

      axios({
        url: "/api/news/" + id,
        method: "GET",
      }).then((res) => {
        this.header = res.data.header;
        this.announce = res.data.announce;
        this.description = res.data.description;
      });
    } else document.title = "Создать новость";
  },
};
</script>

<template>
  <form
    method="post"
    enctype="multipart/form-data"
    @submit.prevent="handleSubmit"
  >
    <FormInput
      name="header"
      label="Заголовок"
      placeholder="Введите заголовок"
      v-model="header"
      required="required"
    />
    <FormInput
      name="announce"
      label="Анонс"
      placeholder="Введите анонс"
      v-model="announce"
      required="required"
    />
    <FileUpload
      name="image"
      type="file"
      accept="jpeg,gif,png"
      label="Загрузите картинку(jpeg, gif)"
      @file-uploaded="handleFileUpload"
    />
    <FormTextarea
      name="description"
      class="mb-4"
      label="Текст новости"
      rows="20"
      placeholder="Введите текст новости"
      v-model="description"
      required="required"
    />

    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-outline-primary px-5">
        {{ update ? "Обновить новость" : "Предложить новость" }}
      </button>
    </div>
  </form>
</template>
