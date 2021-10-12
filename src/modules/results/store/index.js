import { listResults } from '@/api/quizes';
import { actions, mutations } from './constants';

export default {
  namespaced: true,
  state: () => ({
    results: {
      loading: false,
      data: [],
    },
  }),
  mutations: {
    [mutations.UPDATE_RESULTS_LOADING](state, payload) {
      state.results.loading = payload;
    },
    [mutations.UPDATE_RESULTS_DATA](state, payload) {
      state.results.data = payload;
    },
  },
  actions: {
    [actions.GET_QUIZES_RESULTS]({ commit }) {
      commit(mutations.UPDATE_RESULTS_LOADING, true);
      listResults()
        .then((results) => {
          commit(mutations.UPDATE_RESULTS_DATA, results);
        })
        .finally(() => {
          commit(mutations.UPDATE_RESULTS_LOADING, false);
        });
    },
  },
};
