import { createNamespacedHelpers } from 'vuex';
import { actions as quizesActions } from '@/modules/quizes/store/constants';

const {
  mapActions: mapQuizesActions,
  mapState: mapQuizesState,
} = createNamespacedHelpers('quizesModule');

export default {
  computed: {
    ...mapQuizesState(['quizes']),
  },
  methods: {
    ...mapQuizesActions({
      fetchQuizes: quizesActions.GET_QUIZES,
    }),
  },
};
