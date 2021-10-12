import { createNamespacedHelpers } from 'vuex';
import { actions as resultsActions } from '@/modules/results/store/constants';

const {
  mapActions: mapQuizesActions,
  mapState: mapQuizesState,
} = createNamespacedHelpers('resultsModule');

export default {
  computed: {
    ...mapQuizesState(['results']),
  },
  methods: {
    ...mapQuizesActions({
      fetchResults: resultsActions.GET_QUIZES_RESULTS,
    }),
  },
};
