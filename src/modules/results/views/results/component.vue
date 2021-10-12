<template>
  <layout-content>
    <el-container direction="vertical">
      <el-row :gutter="20">
        <el-col :span="24">
           <el-empty
              v-if="results.data.length === 0 && !results.loading"
              :image-size="200"
            ></el-empty>
            <el-table
              v-else
              :data="results.data"
              :loading="results.loading"
            >
              <el-table-column type="expand">
                <template slot-scope="props">
                  <template v-for="(answer, index) in props.row.answers">
                    <div :key="answer.id" class="answer-wrapper">
                      <el-divider v-if="index !== 0"></el-divider>
                      <h3 class="answer-heading">{{ answer.heading }}</h3>

                      <template v-if="Array.isArray(answer.payload)">
                        <template v-for="({ label, value }, index) in answer.payload">
                          <p :key="index" class="answer-text">{{ label }} - <strong>{{ value ? value : '--' }}</strong></p>
                        </template>
                      </template>

                      <template v-else-if="typeof answer.payload === 'string'">
                        <p class="answer-text">{{ answer.payload }}</p>
                      </template>

                      <template v-else>
                        <p>Ответа нет =(</p>
                      </template>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <el-table-column
                label="Дата"
                prop="date"
              />
              <el-table-column
                label="Номер занявки"
                prop="applicationNumber"
              />
              <el-table-column
                label="Квиз"
                prop="quiz.name"
              />
            </el-table>
        </el-col>
      </el-row>
    </el-container>
  </layout-content>
</template>

<script>
import resultsStore from '@/modules/results/mixins/store';

const LayoutContent = () => import(/* webpackChunkName: 'layout-page-content' */ '@/components/layouts/page-content');

export default {
  name: 'results',
  components: {
    LayoutContent,
  },
  mixins: [resultsStore],
  mounted() {
    this.fetchResults();
  },
};
</script>

<style scoped>
.answer-heading {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}
.answer-wrapper {
  margin-bottom: 12px;
  margin-top: 12px;
}
.answer-text {
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 14px;
  color: grey;
}
</style>
