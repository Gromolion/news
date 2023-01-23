<script>
import FormInput from "@/components/forms/FormInput.vue";

export default {
  name: "RegisterView",
  components: { FormInput },
  data() {
    return {
      name: null,
      password: null,
      repeatedPassword: null,
    };
  },
  methods: {
    handleSubmit() {
      const { name, password, repeatedPassword } = this;
      const { dispatch } = this.$store;
      if (name && password && repeatedPassword) {
        dispatch("auth/register", { name, password, repeatedPassword });
      }
    },
  },
  created() {
    document.title = "Регистрация";
  },
};
</script>

<template>
  <form class="login mt-4 p-4" @submit.prevent="handleSubmit">
    <h1>Регистрация</h1>
    <FormInput
      name="name"
      label="Логин"
      v-model="name"
      placeholder="Введите логин"
    />
    <FormInput
      name="password"
      label="Пароль"
      type="password"
      v-model="password"
      placeholder="Введите пароль"
    />
    <FormInput
      name="repeatedPassword"
      label="Повтор пароля"
      type="password"
      v-model="repeatedPassword"
      placeholder="Повторите пароль"
    />
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-outline-primary">
        Зарегистрироваться
      </button>
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
