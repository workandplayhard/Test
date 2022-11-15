import Vue from 'vue';
import VueRouter from 'vue-router';
import qs from 'qs';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: {
      name: 'marketplace'
    }
  }
];

const router = new VueRouter({
  routes,

  parseQuery(query) {
    return qs.parse(query);
  },

  stringifyQuery(query) {
    const result = qs.stringify(query);

    return result ? (`?${result}`) : '';
  }
});

router.beforeResolve((to, from, next) => {
  const { viewSetup: { sideBar } = {} } = to.meta;

  // if (sideBar) {
  //   store.dispatch('admin/changeSideBarState', sideBar);
  // } else {
  //   store.dispatch('admin/resetSideBarState');
  // }

  next();
});

export default router;
