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

                <el-checkbox v-model="model.steps[index].navigation.last" label="last">Последний шаг</el-checkbox>
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
                  <el-radio-group
                    class="field-kind"
                    v-model="model.steps[index].kind"
                    @change="handleStepKindChange"
                  >
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

          <template v-if="step.kind === 'buttons-list'">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-container class="section" direction="vertical">
                  <h4 class="heading">Список кнопок</h4>
                  <div class="add-button">
                    <el-button
                      size="small"
                      @click="() => handleStepButtonAdd(index)"
                    >
                      Добавить Кнопку
                    </el-button>
                  </div>
                  <el-tabs
                    closable
                    tab-position="left"
                    v-if="model.steps[index].body"
                    v-model="activeButton"
                    @tab-remove="(buttonId) => handleButtonRemove(buttonId, index)"
                  >
                    <el-tab-pane
                      v-for="(button, buttonIndex) in model.steps[index].body.buttons"
                      :key="button.id"
                      :label="button.text || `Кнопка ${buttonIndex + 1}`"
                      :name="button.id"
                    >
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-container class="section" direction="vertical">
                            <el-form-item
                              label="Текст"
                              :key="button.id + 'heading'"
                              :prop="'steps.' + index + '.body.buttons.' + buttonIndex + '.text'"
                              :rules="{
                                required: true, message: 'Обязательное поле', trigger: 'blur'
                              }"
                            >
                              <el-input
                                v-model="model.steps[index].body.buttons[buttonIndex].text"
                              ></el-input>
                            </el-form-item>
                          </el-container>

                          <el-container class="section" direction="vertical">
                            <h5 class="heading">Подсказка</h5>
                            <el-form-item
                              label="Тип подсказки"
                              :key="button.id + 'hint-kind'"
                              :prop="'steps.' + index + '.body.buttons.' + buttonIndex + '.hint.kind'"
                            >
                              <el-radio-group v-model="model.steps[index].body.buttons[buttonIndex].hint.kind">
                                <el-radio-button label="text">Текст</el-radio-button>
                                <el-radio-button label="modal">Попап</el-radio-button>
                              </el-radio-group>
                            </el-form-item>

                            <el-form-item
                              label="Текст подсказки"
                              :key="step.id + 'hint-text'"
                              :prop="'steps.' + index + '.body.buttons.' + buttonIndex + '.hint.data.text'"
                            >
                              <el-input
                                v-model="model.steps[index].body.buttons[buttonIndex].hint.data.text"
                              ></el-input>
                            </el-form-item>
                          </el-container>
                        </el-col>
                        <el-col :span="12">
                          <el-container class="section" direction="vertical">
                            <h4 class="heading">Навигация</h4>
                            <el-form-item label="Далее">
                              <el-select
                                v-model="model.steps[index].body.buttons[buttonIndex].navigation.next"
                                placeholder="Далее"
                                :disabled="!model.steps[index].body.buttons[buttonIndex].text"
                                clearable
                              >
                                <el-option
                                  v-for="step in model.steps.filter(
                                    (step, stepIndex) => navigationFilter(step, stepIndex, index)
                                  )"
                                  :key="`${step.id}button.navigation.next`"
                                  :label="step.heading.text.main"
                                  :value="step.id"
                                />
                              </el-select>
                            </el-form-item>

                            <el-checkbox v-model="model.steps[index].body.buttons[buttonIndex].navigation.last" label="last">Последний шаг</el-checkbox>
                          </el-container>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                  </el-tabs>
                </el-container>
              </el-col>
            </el-row>
          </template>

          <template v-if="step.kind === 'single-input'">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-container class="section" direction="vertical">
                  <el-form-item
                    v-if="model.steps[index].body"
                    label="Плейсхолдер"
                    :prop="'steps.' + index + '.body.placeholder'"
                  >
                    <el-input v-model="model.steps[index].body.placeholder"></el-input>
                  </el-form-item>
                </el-container>
              </el-col>

              <el-col :span="12">
                <el-container class="section" direction="vertical">
                  <el-form-item
                    label="Валидации"
                    :prop="'steps.' + index + '.body.validations'"
                  >
                    <el-checkbox-group
                      v-if="model.steps[index].body && model.steps[index].body.validations"
                      v-model="model.steps[index].body.validations"
                    >
                      <el-checkbox label="required">Обязательное поле</el-checkbox>
                      <el-checkbox label="email">Валидный Е-мейл</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-container>
              </el-col>
            </el-row>
          </template>

          <template v-if="step.kind === 'single-textarea'">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-container class="section" direction="vertical">
                  <el-form-item
                    v-if="model.steps[index].body"
                    label="Плейсхолдер"
                    :prop="'steps.' + index + '.body.placeholder'"
                  >
                    <el-input v-model="model.steps[index].body.placeholder"></el-input>
                  </el-form-item>
                </el-container>
              </el-col>

              <el-col :span="12">
                <el-container class="section" direction="vertical">
                  <el-form-item
                    label="Валидации"
                    :prop="'steps.' + index + '.body.validations'"
                  >
                    <el-checkbox-group
                      v-if="model.steps[index].body && model.steps[index].body.validations"
                      v-model="model.steps[index].body.validations"
                    >
                      <el-checkbox label="required">Обязательное поле</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-container>
              </el-col>
            </el-row>
          </template>

          <template v-if="step.kind === 'checkbox-list'">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-container class="section" direction="vertical">
                  <el-form-item
                    label="Количество колонок"
                    :prop="'steps.' + index + '.body.cols'"
                  >
                    <el-input-number
                      v-model="model.steps[index].body.cols"
                      size="mini"
                      :min="1"
                      :max="4"
                    ></el-input-number>
                  </el-form-item>
                  <h4 class="heading">Список чекбоксов</h4>
                  <div class="add-button">
                    <el-button
                      size="small"
                      @click="() => handleStepCheckboxAdd(index, 'checkboxes')"
                    >
                      Добавить Чекбокс
                    </el-button>
                  </div>
                  <template v-for="(checkbox, checkboxIndex) in model.steps[index].body.checkboxes">
                    <el-form-item
                      label="Чекбокс"
                      :key="checkbox.id"
                      :prop="'steps.' + index + '.body.checkboxes.' + checkboxIndex + '.label'"
                      :rules="{
                        required: true, message: 'Обязательное поле', trigger: 'blur'
                      }"
                    >
                      <el-input
                        v-model="model.steps[index].body.checkboxes[checkboxIndex].label"
                        placeholder="Лейбл"
                      >
                        <el-button
                          slot="append"
                          icon="el-icon-delete"
                          @click="() => handleStepCheckboxDelete(index, 'checkboxes', checkboxIndex)"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-container>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-container class="section" direction="vertical">
                  <h4 class="heading">Список дополнительных чекбоксов</h4>
                  <div class="add-button">
                    <el-button
                      size="small"
                      @click="() => handleStepCheckboxAdd(index, 'additional')"
                    >
                      Добавить Дополнительный Чекбокс
                    </el-button>
                  </div>
                  <template v-for="(checkbox, additionalCheckboxIndex) in model.steps[index].body.additional">
                    <el-form-item
                      label="Дополнительный чекбокс"
                      :key="checkbox.id"
                      :prop="'steps.' + index + '.body.additional.' + additionalCheckboxIndex + '.label'"
                      :rules="{
                        required: true, message: 'Обязательное поле', trigger: 'blur'
                      }"
                    >
                      <el-input
                        v-model="model.steps[index].body.additional[additionalCheckboxIndex].label"
                        placeholder="Лейбл"
                      >
                        <el-button
                          slot="append"
                          icon="el-icon-delete"
                          @click="() => handleStepCheckboxDelete(index, 'additional', additionalCheckboxIndex)"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                  </template>
                </el-container>
              </el-col>
            </el-row>
          </template>

          <template v-if="step.kind === 'multiple-fields'">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-container class="section" direction="vertical">
                  <h4 class="heading">Список полей</h4>
                  <div class="add-button">
                    <el-button
                      size="small"
                      @click="() => handleFieldAdd(index)"
                    >
                      Добавить поле
                    </el-button>
                  </div>
                  <template v-for="(field, fieldIndex) in model.steps[index].body.fields">
                    <el-form-item
                      label="Тип"
                      size="small"
                      :key="field.id + 'field-kind'"
                      :prop="'steps.' + index + '.body.fields.' + fieldIndex + '.kind'"
                    >
                      <el-radio-group v-model="model.steps[index].body.fields[fieldIndex].kind">
                        <el-radio-button label="input">Инпут</el-radio-button>
                        <el-radio-button label="textarea">Текстовое поле</el-radio-button>
                      </el-radio-group>
                    </el-form-item>

                    <el-row :key="field.id + 'field-section'" :gutter="20">
                      <el-col :span="12">
                        <el-container class="section" direction="vertical">
                          <el-form-item
                            label="Плейсхолдер"
                            :prop="'steps.' + index + '.body.fields.' + fieldIndex + '.data.placeholder'"
                            :rules="{
                              required: true, message: 'Обязательное поле', trigger: 'blur'
                            }"
                          >
                            <el-input v-model="model.steps[index].body.fields[fieldIndex].data.placeholder"></el-input>
                          </el-form-item>
                        </el-container>
                      </el-col>

                      <el-col :span="12">
                        <el-container class="section" direction="vertical">
                          <el-form-item
                            label="Валидации"
                            :prop="'steps.' + index + '.body.fields.' + fieldIndex + '.data.validations'"
                          >
                            <el-checkbox-group v-model="model.steps[index].body.fields[fieldIndex].data.validations">
                              <el-checkbox label="required">Обязательное поле</el-checkbox>
                              <el-checkbox label="email">Валидный Е-мейл</el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-container>
                      </el-col>
                    </el-row>
                  </template>
                </el-container>
              </el-col>
            </el-row>
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-container>

    <el-col>
      <el-row type="flex" justify="end">
        <el-button
          class="button-submit"
          type="primary"
          size="default"
          :loading="loading"
          @click="handleFormSubmit"
        >
          Создать
        </el-button>
      </el-row>
    </el-col>
  </el-form>
</template>

<script>
import { v4 } from 'uuid';
import { clone } from 'ramda';

export default {
  name: 'quiz-form',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeStep: null,
      activeButton: null,
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
      models: {
        'buttons-list': {
          buttons: [],
        },
        'single-input': {
          placeholder: '',
          validations: [],
        },
        'single-textarea': {
          placeholder: '',
          validations: [],
        },
        'checkbox-list': {
          cols: 1,
          checkboxes: [],
          additional: [],
        },
        'multiple-fields': {
          fields: [],
        },
      },
    };
  },
  methods: {
    handleStepKindChange(nextKind) {
      const getIsIdEquals = ({ id }) => id === this.activeStep;

      const activeStepIndex = this.model.steps.findIndex(getIsIdEquals);
      const nextBody = this.models[nextKind];

      this.model.steps[activeStepIndex].body = clone(nextBody);
    },
    navigationFilter(step, stepIndex, index) {
      return stepIndex !== index && step.heading.text.main;
    },
    handleFormSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('quiz-form:create', this.model);
        }
      });
    },
    handleStepAdd() {
      const id = v4();

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
        body: clone(this.models['buttons-list']),
      });

      this.setActiveStep(this.model.steps);
    },
    handleStepButtonAdd(stepIndex) {
      const id = v4();

      this.model.steps[stepIndex].body.buttons.push({
        id,
        text: '',
        hint: {
          kind: '',
          data: {
            text: '',
            image: '',
          },
        },
        navigation: {
          skip: '',
          next: '',
        },
      });

      this.setActiveButton(this.model.steps[stepIndex].body.buttons);
    },
    handleButtonRemove(buttonId, stepIndex) {
      this.model.steps[stepIndex].body.buttons = this.model.steps[stepIndex].body.buttons.filter(({ id }) => id !== buttonId);
      this.setActiveButton(this.model.steps[stepIndex].body.buttons, buttonId);
    },
    handleStepCheckboxAdd(stepIndex, modelKey) {
      const id = v4();

      this.model.steps[stepIndex].body[modelKey].push({
        id,
        label: '',
      });
    },
    handleStepCheckboxDelete(stepIndex, modelKey, checkboxIndex) {
      this.model.steps[stepIndex].body[modelKey] = this.model.steps[stepIndex].body[modelKey].filter((_, index) => index !== checkboxIndex);
    },
    handleFieldAdd(stepIndex) {
      const id = v4();

      this.model.steps[stepIndex].body.fields.push({
        id,
        kind: 'input',
        data: {
          placeholder: '',
          validations: [],
        },
      });
    },
    handleFieldADelete(stepIndex, fieldIndex) {
      this.model.steps[stepIndex].body.fields = this.model.steps[stepIndex].body.fields.filter(({ id }) => id !== fieldIndex);
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
    setActiveButton(buttons, toRemoveButtonId) {
      const isFirstOrLast = buttons.length === 1;

      if ((isFirstOrLast && toRemoveButtonId) || isFirstOrLast) {
        this.activeButton = buttons[0].id;
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

.add-step,
.add-button {
  margin-top: 10px;
  margin-bottom: 15px;
}
</style>
