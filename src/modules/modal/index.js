import { modalRouter as modalRouter } from '@/modules/modal/router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of modalRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NftMarketplaceModalModule]: router instance is not provided');
  }
};

export const NftMarketplaceModalModule = {
  name: 'NftMarketplaceModalModule',
  deps: [
    'EnvModule',
    // 'AuthModule',
    // 'NftItemsModule'
  ],
  install
};
