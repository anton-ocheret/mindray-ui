<template>
  <el-menu
    class="app-navigation"
    :collapse="true"
    @select="handleMenuItemClick"
    :default-active="getActive()"
  >
    <el-menu-item
      :index="$root.$options.ROUTE_NAMES.QUIZES"
      :class="[getActiveClass($root.$options.ROUTE_NAMES.QUIZES)]"
    >
      <i class="el-icon-menu"></i>
      <span slot="title">Список Квизов</span>
    </el-menu-item>
    <el-menu-item
      :index="$root.$options.ROUTE_NAMES.RESULTS"
      :class="[getActiveClass($root.$options.ROUTE_NAMES.RESULTS)]"
    >
      <i class="el-icon-s-order"></i>
      <span slot="title">Список Результатов</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'app-navigation',
  methods: {
    handleMenuItemClick(name) {
      this.$router.push({ name });
    },
    getActiveClass(name) {
      return this.$route.name === name ? 'pointer-events-none' : '';
    },
    getActive() {
      return this.$route.name.split('_')[0];
    },
  },
};
</script>

<style scoped>
.app-navigation {
  min-height: 100vh;
  height: 100%;
}
</style>
