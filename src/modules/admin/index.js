import { adminRouter } from '@/modules/admin/router';
import { adminStore } from './store';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router, store } = options;

  if (store) {
    store.registerModule('admin', adminStore);
  } else {
    throw Error('[NftMarketplaceAdminModule]: storeInstance is not provided');
  }

  if (router) {
    for (const route of adminRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NftMarketplaceAdminModule]: router instance is not provided');
  }
};

export const NftMarketplaceAdminModule = {
  name: 'NftMarketplaceAdminModule',
  deps: [
    'EnvModule'
  ],
  install
};
