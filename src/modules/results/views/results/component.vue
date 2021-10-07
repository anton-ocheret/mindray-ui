<template>
  <layout-content>
    Список результатов
  </layout-content>
</template>

<script>
const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');

export default {
  name: 'results',
  components: {
    LayoutContent,
  },
};
</script>
