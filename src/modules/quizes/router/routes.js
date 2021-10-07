import { ROUTE_NAMES } from '@/modules/quizes/router/constants';

const Layout = () => import(/* webpackChunkName: 'layout' */ '@/components/layouts/default');
const Quizes = () => import(/* webpackChunkName: 'quiz' */ '@/modules/quizes/views/quizes');

export default [
  {
    name: ROUTE_NAMES.QUIZES,
    path: '/quizes',
    component: Quizes,
    meta: {
      layout: Layout,
    },
  },
];
