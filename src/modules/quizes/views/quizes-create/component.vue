<template>
  <layout-content>
    Создать Квиз
  </layout-content>
</template>

<script>
const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');

export default {
  name: 'quizes-create',
  components: {
    LayoutContent,
  },
};
</script>
