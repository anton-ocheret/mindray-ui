<template>
  <el-header
    height="auto"
    class="app-header"
  >
    <el-row type="flex" align="middle" justify="space-between">
      <el-col>
        <el-row type="flex" justify="start">
          <slot name="left"></slot>
        </el-row>
      </el-col>
      <el-col><h1 class="heading">{{ $route.meta.heading }}</h1></el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'app-header',
};
</script>

<style lang="scss">
.app-header {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid $border-base;
}
.heading {
  text-align: center;
  margin: 0;
}
</style>
