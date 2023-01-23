<template>
  <div class="form-group mb-2" :class="divClass">
    <label v-if="label" :for="name + '_input'" :class="labelClass">
      {{ label }}
    </label>
    <input
      :required="required"
      type="file"
      :name="name"
      :id="name + '_input'"
      class="form-control"
      :class="inputClass"
      @change="handleFileChange($event)"
      ref="file"
    />
  </div>
  <div v-if="file.isUploaded" class="upload-preview">
    <img :src="file.url" v-if="file.isImage" class="file-image p-3" alt="" />
  </div>
</template>

<script>
export default {
  name: "FileUpload",
  props: {
    maxSize: {
      type: Number,
      default: 5,
    },
    accept: {
      type: String,
    },
    name: String,
    label: String,
    required: Boolean,
    inputClass: String,
    labelClass: String,
    divClass: String,
  },
  data() {
    return {
      file: {
        url: "",
        isImage: false,
        isUploaded: false,
      },
      errors: false,
    };
  },
  methods: {
    handleFileChange(e) {
      if (e.target.files && e.target.files[0]) {
        if (this.isFileValid(e.target.files[0])) {
          const file = e.target.files[0];
          const fileExtension = file.name.split(".").pop();
          this.file.isImage = ["jpg", "jpeg", "png", "gif"].includes(
            fileExtension
          );
          this.file.isUploaded = true;
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (res) => {
            this.file.url = res.target.result;
          };

          this.$emit("file-uploaded", this.$refs.file.files[0]);
        }
      }
    },
    isFileValid(file) {
      this.isFileTypeValid(file.name.split(".").pop());
      return !this.errors;
    },
    isFileTypeValid(fileExtension) {
      if (fileExtension && !this.accept.split(",").includes(fileExtension)) {
        const { dispatch } = this.$store;
        dispatch("alert/error", ["Неподдерживаемый тип файла"], {
          root: true,
        });
        this.errors = true;
      }
    },
  },
};
</script>

<style scoped>
.file-image {
  border: 1px black dashed;
  border-radius: 15px;
}
</style>
