<template>
  <layout-content>
    <quiz-form />
  </layout-content>
</template>

<script>
import QuizForm from '@/modules/quizes/components/quiz-form';

const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');
export default {
  name: 'quizes-create',
  components: {
    LayoutContent,
    QuizForm,
  },
};
</script>
