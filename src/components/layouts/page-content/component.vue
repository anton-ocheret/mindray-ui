<template>
  <el-container
    class="layout-container"
    direction="vertical"
  >
    <app-header>
      <slot name="header-left" slot="left" />
      <slot name="header-right" slot="right" />
    </app-header>
    <el-main>
      <slot />
    </el-main>
    <app-footer />
  </el-container>
</template>

<script>
const AppHeader = () => import(/* WebpackChunkName 'app-header' */ '@/components/app/app-header');
const AppFooter = () => import(/* webpackChunkName: 'app-footer' */ '@/components/app/app-footer');

export default {
  name: 'page-content',
  components: {
    AppHeader,
    AppFooter,
  },
};
</script>

<style lang="scss" scoped>
.layout-container {
  min-height: 100vh;
}
</style>
