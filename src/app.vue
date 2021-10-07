<template>
  <el-container>
    <el-aside width="auto">
      <el-menu
        class="app-navigation"
        :collapse="true"
        router
      >
        <el-menu-item index="quizes">
          <i class="el-icon-menu"></i>
          <span slot="title">Список Квизов</span>
        </el-menu-item>
        <el-menu-item index="results">
          <i class="el-icon-s-order"></i>
          <span slot="title">Результаты</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container class="layout-container">
      <el-header height="auto">
        Хедер
      </el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
  .app-navigation {
    min-height: 100vh;
  }
  .layout-container {
    min-height: 100vh;
  }
</style>
