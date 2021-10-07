import { list } from '@/api/quizes';
import { actions, mutations } from './constants';

export default {
  namespaced: true,
  state: () => ({
    quizes: {
      loading: false,
      data: [],
    },
  }),
  mutations: {
    [mutations.UPDATE_QUIZES_LOADING](state, payload) {
      state.quizes.loading = payload;
    },
    [mutations.UPDATE_QUIZES_DATA](state, payload) {
      state.quizes.data = payload;
    },
  },
  actions: {
    [actions.GET_QUIZES]({ commit }) {
      commit(mutations.UPDATE_QUIZES_LOADING, true);
      list()
        .then((quizes) => {
          commit(mutations.UPDATE_QUIZES_DATA, quizes);
        })
        .finally(() => {
          commit(mutations.UPDATE_QUIZES_LOADING, false);
        });
    },
  },
};
