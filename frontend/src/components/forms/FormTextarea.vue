<script>
export default {
  name: "FormTextarea",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    type: {
      type: String,
      default: "text",
    },
    divClass: String,
    labelClass: String,
    inputClass: String,
    placeholder: String,
    value: String,
    error: String,
    errorClass: String,
    rows: Number,
    cols: Number,
  },
};
</script>

<template>
  <div class="form-group mb-2" :class="divClass">
    <label :for="name + '_input'" :class="labelClass">
      {{ label }}
    </label>
    <textarea
      :name="name"
      class="form-control"
      :class="inputClass"
      :rows="rows"
      :cols="cols"
      :placeholder="placeholder"
      :value="value"
    >
    </textarea>
    <p v-if="error" class="text-danger" :class="errorClass" role="alert">
      <strong>{{ error }}</strong>
    </p>
  </div>
</template>
