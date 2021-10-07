<template>
  <layout-content>
    <template v-slot:header-right>
      <el-button
        type="primary"
        @click="handleClick"
      >
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
  methods: {
    handleClick() {
      this.$router.push({ name: this.$root.$options.ROUTE_NAMES.QUIZES_CREATE });
    },
  },
  mounted() {
    this.fetchQuizes();
  },
};
</script>
