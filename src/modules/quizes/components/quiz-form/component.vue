<template>
  <el-form
    status-icon
    ref="form"
    label-position="top"
    :model="model"
    :rules="rules"
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
      <h3 class="heading">Шаги</h3>
      <div class="add-step">
        <el-button
          size="small"
          @click="handleStepAdd"
        >
          Добавить Шаг
        </el-button>
      </div>

      <el-tabs
        closable
        tab-position="left"
        v-if="model.steps.length"
        v-model="activeStep"
        @tab-remove="handleStepRemove"
      >
        <el-tab-pane
          v-for="(step, index) in model.steps"
          :key="step.id"
          :label="step.heading.text.main || step.name"
          :name="step.id"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-container class="section" direction="vertical">
                <h4 class="heading">Заголовок</h4>
                <el-form-item
                  label="Текст"
                  :key="step.id + 'heading'"
                  :prop="'steps.' + index + '.heading.text.main'"
                  :rules="{ required: true, message: 'Обязательное поле', trigger: 'blur' }"
                >
                  <el-input v-model="model.steps[index].heading.text.main"></el-input>
                </el-form-item>

                <el-form-item
                  label="Подзаголовок"
                  :key="step.id + 'sub'"
                  :prop="'steps.' + index + '.heading.text.sub'"
                >
                  <el-input v-model="model.steps[index].heading.text.sub"></el-input>
                </el-form-item>
              </el-container>

              <el-container class="section" direction="vertical">
                <h5 class="heading">Подсказка</h5>
                <el-form-item
                  label="Тип подсказки"
                  :key="step.id + 'hint-kind'"
                  :prop="'steps.' + index + '.heading.hint.kind'"
                >
                  <el-radio-group v-model="model.steps[index].heading.hint.kind">
                    <el-radio-button label="text">Текст</el-radio-button>
                    <el-radio-button label="modal">Попап</el-radio-button>
                  </el-radio-group>
                </el-form-item>

                <el-form-item
                  label="Текст подсказки"
                  :key="step.id + 'hint-text'"
                  :prop="'steps.' + index + '.heading.hint.data.text'"
                >
                  <el-input v-model="model.steps[index].heading.hint.data.text"></el-input>
                </el-form-item>
              </el-container>
            </el-col>
            <el-col :span="12">
              <el-container class="section" direction="vertical">
                <h4 class="heading">Навигация</h4>
                <el-form-item label="Далее">
                  <el-select
                    v-model="model.steps[index].navigation.next"
                    placeholder="Далее"
                    :disabled="!model.steps[index].heading.text.main"
                    clearable
                  >
                    <el-option
                      v-for="step in model.steps.filter(
                        (step, stepIndex) => navigationFilter(step, stepIndex, index)
                      )"
                      :key="`${step.id}navigation.next`"
                      :label="step.heading.text.main"
                      :value="step.id"
                    />
                  </el-select>
                </el-form-item>

                <el-form-item label="Пропустить">
                  <el-select
                    v-model="model.steps[index].navigation.skip"
                    placeholder="Пропустить"
                    :disabled="!model.steps[index].heading.text.main"
                    clearable
                  >
                    <el-option
                      v-for="step in model.steps.filter(
                        (step, stepIndex) => navigationFilter(step, stepIndex, index)
                      )"
                      :key="`${step.id}navigation.skip`"
                      :label="step.heading.text.main"
                      :value="step.id"
                    />
                  </el-select>
                </el-form-item>
              </el-container>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="24">
              <el-container class="section" direction="vertical">
                <h4 class="heading">Тип контента</h4>
                <el-form-item
                  :key="step.id + 'kind'"
                  :prop="'steps.' + index + '.kind'"
                >
                  <el-radio-group class="field-kind" v-model="model.steps[index].kind">
                    <el-radio border label="buttons-list">Список кнопок</el-radio>
                    <el-radio border label="checkbox-list">Список чекбоксов</el-radio>
                    <el-radio border label="multiple-fields">Список полей</el-radio>
                    <el-radio border label="single-input">Инпут</el-radio>
                    <el-radio border label="single-textarea">Текстовое поле</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-container>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-container>

    <el-button
      class="button-submit"
      type="primary"
      @click="handleFormSubmit"
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
      activeStep: null,
      model: {
        name: '',
        url: '',
        steps: [],
      },
      rules: {
        name: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
        ],
        url: [
          { required: true, message: 'Обязательное поле', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    navigationFilter(step, stepIndex, index) {
      return stepIndex !== index && step.heading.text.main;
    },
    handleFormSubmit() {
      this.$refs.form.validate((valid) => console.log(valid, this.model));
    },
    handleStepAdd() {
      const id = String(Math.random());

      this.model.steps.push({
        id,
        name: this.getStepDefaultName(this.model.steps.length),
        kind: 'buttons-list',
        heading: {
          text: {
            main: '',
            sub: '',
          },
          hint: {
            kind: '',
            data: {
              text: '',
              image: '',
            },
          },
        },
        navigation: {
          skip: '',
          next: '',
        },
      });

      this.setActiveStep(this.model.steps);
    },
    getStepDefaultName(length) {
      return `Шаг-${length + 1}`;
    },
    handleStepRemove(value) {
      const step = this.model.steps.find(
        ({ navigation }) => navigation.next === value || navigation.skip === value,
      );

      if (step) {
        return this.$message({
          message: `Сперва нужно удалить из навигации в шаге "${step.heading.text.main}"`,
          type: 'warning',
          duration: 5000,
        });
      }

      this.model.steps = this.model.steps.filter(({ id }) => id !== value);
      this.reorderSteps();
      return this.setActiveStep(this.model.steps, value);
    },
    reorderSteps() {
      this.model.steps = this.model.steps.map(
        (step, index) => ({ ...step, name: this.getStepDefaultName(index) }),
      );
    },
    setActiveStep(steps, toRemoveStepId) {
      const isFirstOrLast = steps.length === 1;

      if ((isFirstOrLast && toRemoveStepId) || isFirstOrLast) {
        this.activeStep = steps[0].id;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__item {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 32px;
  line-height: 1.35;
  max-width: 220px;
  white-space: inherit;

  overflow: hidden;
  text-overflow: ellipsis;

  .el-icon-close {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
::v-deep .el-input__inner {
  padding-right: 30px;
}
.field-kind {
  margin-left: -5px;
  & ::v-deep .el-radio {
    margin: 5px !important;
  }
}
.heading {
  text-align: left;
  margin-bottom: 10px;
}

.section {
  margin-bottom: 5px;
}

.add-step {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
