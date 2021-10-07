import Vue from 'vue';
import Vuex from 'vuex';

import { store as quizesModule } from '@/modules/quizes';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    quizesModule,
  },
});
