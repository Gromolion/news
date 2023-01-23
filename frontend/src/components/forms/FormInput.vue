<script>
export default {
  name: "FormInput",
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
    modelValue: String,
    error: String,
    errorClass: String,
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
};
</script>

<template>
  <div class="form-group mb-2" :class="divClass">
    <label v-if="label" :for="name + '_input'" :class="labelClass">
      {{ label }}
    </label>
    <input
      :required="required"
      :type="type"
      :name="name"
      :id="name + '_input'"
      class="form-control"
      :class="inputClass"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="text-danger" :class="errorClass" role="alert">
      <strong>{{ error }}</strong>
    </p>
  </div>
</template>
