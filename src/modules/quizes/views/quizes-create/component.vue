<template>
  <layout-content>
    <quiz-form @quiz-form:create="handleQuizCreate"/>
  </layout-content>
</template>

<script>
import quizesStore from '@/modules/quizes/mixins/store';
import QuizForm from '@/modules/quizes/components/quiz-form';

const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');
export default {
  name: 'quizes-create',
  components: {
    LayoutContent,
    QuizForm,
  },
  mixins: [quizesStore],
  methods: {
    handleQuizCreate(data) {
      this.createQuiz(data)
        .then(({ data: { name } }) => {
          this.$notify.success({
            title: 'Успех!',
            message: `"${name}" успешно создан`,
            position: 'bottom-right',
            duration: 50000,
          });
          this.$router.push({ name: this.$root.$options.ROUTE_NAMES.QUIZES });
        })
        .catch((error) => {
          if (error && error.response && error.response.data) {
            if (error.response.data.statusCode && error.response.data.statusCode === 400) {
              this.$notify.error({
                title: 'Ошибка =(',
                message: error.response.data.message,
                duration: 5000,
                position: 'bottom-right',
              });
            }
          } else {
            this.$notify.error({
              title: 'Ошибка =(',
              message: 'Что то пошло не так, попробуйте пожалуйста позже.',
              position: 'bottom-right',
            });
          }
        });
    },
  },
};
</script>

<style scoped>
::v-deep .el-notification__content {
  text-align: left;
}
</style>
