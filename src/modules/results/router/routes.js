import { ROUTE_NAMES } from '@/modules/results/router/constants';

const Layout = () => import(/* webpackChunkName: 'layout-page' */ '@/components/layouts/page');
const Results = () => import(/* webpackChunkName: 'results' */ '@/modules/results/views/results');

export default [
  {
    name: ROUTE_NAMES.RESULTS,
    path: '/results',
    component: Results,
    meta: {
      layout: Layout,
      heading: 'Результаты',
    },
  },
];
