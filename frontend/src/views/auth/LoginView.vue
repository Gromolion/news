<script>
import FormInput from "@/components/forms/FormInput.vue";

export default {
  name: "LoginView",
  components: { FormInput },
  data() {
    return {
      name: null,
      password: null,
    };
  },
  methods: {
    handleSubmit() {
      const { name, password } = this;
      const { dispatch } = this.$store;
      if (name && password) {
        dispatch("auth/login", { name, password });
      }
    },
  },
  created() {
    document.title = "Вход";
  },
};
</script>

<template>
  <form class="login mt-4 p-4" @submit.prevent="handleSubmit">
    <h1>Вход</h1>
    <FormInput
      name="name"
      label="Логин"
      v-model="name"
      placeholder="Введите логин"
    />
    <FormInput
      name="name"
      label="Пароль"
      type="password"
      v-model="password"
      placeholder="Введите пароль"
    />
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-outline-primary">Войти</button>
    </div>
  </form>
</template>

<style scoped>
form.login {
  background-color: #f8f9fa;
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
}
button {
  padding: 8px 30px;
}
</style>
