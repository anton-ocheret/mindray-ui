import Vue from 'vue';
import Vuex from 'vuex';

import { store as quizesModule } from '@/modules/quizes';
import { store as resultsModule } from '@/modules/results';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    quizesModule,
    resultsModule,
  },
});
