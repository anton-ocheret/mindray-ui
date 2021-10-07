import { ROUTE_NAMES } from '@/modules/quizes/router/constants';

const Layout = () => import(/* webpackChunkName: 'layout-page' */ '@/components/layouts/page');
const Quizes = () => import(/* webpackChunkName: 'quizes' */ '@/modules/quizes/views/quizes');

export default [
  {
    name: ROUTE_NAMES.QUIZES,
    path: '/',
    component: Quizes,
    meta: {
      layout: Layout,
      heading: 'Список Квизов',
    },
  },
];
