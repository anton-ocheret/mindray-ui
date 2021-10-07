<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        class="app-navigation"
        :collapse="true"
        @select="handleMenuItemClick"
        :default-active="$route.name"
      >
        <el-menu-item :index="$root.$options.ROUTE_NAMES.QUIZES">
          <i class="el-icon-menu"></i>
          <span slot="title">Список Квизов</span>
        </el-menu-item>
        <el-menu-item :index="$root.$options.ROUTE_NAMES.RESULTS">
          <i class="el-icon-s-order"></i>
          <span slot="title">Список Результатов</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="layout-container">
      <el-header class="app-header">
        Хедер
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer class="app-footer">Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'layout-default',
  methods: {
    handleMenuItemClick(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="scss">
  .app-navigation {
    min-height: 100vh;
  }
  .layout-container {
    min-height: 100vh;
  }
  .app-header {
    border-bottom: 1px solid $border-base;
  }
  .app-footer {
    border-top: 1px solid $border-base;
  }
</style>
