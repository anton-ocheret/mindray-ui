<template>
  <el-footer
    class="app-footer"
    height="auto"
  >
    <el-row type="flex" align="middle" justify="end">
      <p class="copyright">
        &copy; copyright {{ new Date().getFullYear() }}
      </p>
    </el-row>
  </el-footer>
</template>

<script>
export default {
  name: 'app-footer',
};
</script>

<style lang="scss">
  .app-footer {
    padding-top: 15px;
    padding-bottom: 15px;
    border-top: 1px solid $border-base;
  }
</style>
