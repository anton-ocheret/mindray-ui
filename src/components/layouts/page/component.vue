<template>
  <el-container>
    <el-aside width="auto">
      <app-navigation />
    </el-aside>
    <router-view></router-view>
  </el-container>
</template>

<script>
const AppNavigation = () => import(/* WebpackChunkName 'app-navigation' */ '@/components/app/app-navigation');

export default {
  name: 'page',
  components: {
    AppNavigation,
  },
};
</script>
