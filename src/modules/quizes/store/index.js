import { list, create } from '@/api/quizes';
import { actions, mutations } from './constants';

export default {
  namespaced: true,
  state: () => ({
    quizes: {
      loading: false,
      data: [],
    },
    quiz: {
      loading: false,
    },
  }),
  mutations: {
    [mutations.UPDATE_QUIZES_LOADING](state, payload) {
      state.quizes.loading = payload;
    },
    [mutations.UPDATE_QUIZES_DATA](state, payload) {
      state.quizes.data = payload;
    },
    [mutations.UPDATE_QUIZE_LOADING](state, payload) {
      state.quiz.loading = payload;
    },
  },
  actions: {
    [actions.CREATE_QUIZ]({ commit }, data) {
      commit(mutations.UPDATE_QUIZE_LOADING, true);
      return new Promise((resolve, reject) => {
        create(data)
          .then(resolve)
          .catch(reject)
          .finally(commit(mutations.UPDATE_QUIZE_LOADING, true));
      });
    },
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
