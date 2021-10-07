<template>
  <layout-content>
    <template v-slot:header-right>
      <el-button type="primary">
        Создать Квиз
      </el-button>
    </template>
  </layout-content>
</template>

<script>
import quizesStore from '@/modules/quizes/mixins/store';

const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');

export default {
  name: 'quizes',
  mixins: [quizesStore],
  components: {
    LayoutContent,
  },
  mounted() {
    this.fetchQuizes();
  },
};
</script>
