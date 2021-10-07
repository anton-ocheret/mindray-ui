<template>
  <el-form
    ref="form"
    :model="model"
    :rules="rules"
    status-icon
    @validate="handleValidate"
  >
    <el-container
      class="section"
      direction="vertical"
    >
      <h3 class="heading">Базовая информация</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Имя" prop="name">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Url" prop="url">
            <el-input v-model="model.url"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-container>

    <el-container
      class="section"
      direction="vertical"
    >
      <h3 class="heading">Заголовок</h3>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Текст" prop="main">
            <el-input v-model="model.heading.text.main"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Подзаголовок" prop="sub">
            <el-input v-model="model.heading.text.sub"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-container>

    <el-button
      class="button-submit"
      type="primary"
      :disabled="disabled"
      @click="submitForm"
    >
      Создать
    </el-button>
  </el-form>
</template>

<script>
export default {
  name: 'quiz-form',
  data() {
    return {
      disabled: false,
      model: {
        name: '',
        url: '',
        heading: {
          text: {
            main: '',
            sub: '',
          },
        },
      },
      rules: {
        name: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
        ],
        url: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
        ],
        main: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => valid);
    },
    handleValidate(_, valid) {
      this.disabled = !valid;
    },
  },
};
</script>

<style scoped>
  .heading {
    text-align: left;
    margin-bottom: 5px;
  }

  .section {
    margin-bottom: 15px;
  }
</style>
