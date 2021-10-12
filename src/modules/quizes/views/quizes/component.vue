<template>
  <layout-content>
    <template v-slot:header-right>
      <el-button
        type="primary"
        @click="handleClick"
      >
        Создать Квиз
      </el-button>
    </template>

    <el-container direction="vertical">
      <el-row :gutter="20">
          <el-col :span="24">
            <el-empty
              v-if="quizes.data.length === 0 && !quizes.loading"
              :image-size="200"
            ></el-empty>
            <el-table
              v-else
              :data="quizes.data"
              :loading="quizes.loading"
            >
              <el-table-column
                label="Имя"
                prop="name">
              </el-table-column>

              <el-table-column
                label="Url"
                prop="url">
              </el-table-column>

              <el-table-column
                label="Колличество ответов"
                prop="result.length">
              </el-table-column>

              <el-table-column align="right">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleQuizEdit(scope.$index, scope.row)">Edit</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleQuizDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
      </el-row>
    </el-container>
  </layout-content>
</template>

<script>
import quizesStore from '@/modules/quizes/mixins/store';

const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');

export default {
  name: 'quizes',
  components: {
    LayoutContent,
  },
  mixins: [quizesStore],
  methods: {
    handleClick() {
      this.$router.push({ name: this.$root.$options.ROUTE_NAMES.QUIZES_CREATE });
    },
    handleQuizDelete(index, row) {
      console.log({ index, row });
    },
    handleQuizEdit(index, row) {
      console.log({ index, row });
    },
  },
  mounted() {
    this.fetchQuizes();
  },
};
</script>
