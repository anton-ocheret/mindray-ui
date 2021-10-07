<template>
  <layout-content>
    <template v-slot:header-right>
      <el-button type="primary">
        Создать Квиз
      </el-button>
    </template>
    Hello
  </layout-content>
</template>

<script>
const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');

export default {
  name: 'quizes',
  components: {
    LayoutContent,
  },
};
</script>
