import { ROUTE_NAMES } from '@/modules/quizes/router/constants';

const Layout = () => import(/* webpackChunkName: 'layout-page' */ '@/components/layouts/page');
const Quizes = () => import(/* webpackChunkName: 'quizes' */ '@/modules/quizes/views/quizes');
const QuizesCreate = () => import(/* webpackChunkName: 'quizes-create' */ '@/modules/quizes/views/quizes-create');

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
  {
    name: ROUTE_NAMES.QUIZES_CREATE,
    path: '/quizes/create',
    component: QuizesCreate,
    meta: {
      layout: Layout,
      heading: 'Создать квиз',
    },
  },
];
