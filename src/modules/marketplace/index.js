import { marketplaceRouter } from '@/modules/marketplace/router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of marketplaceRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NftMarketplaceMarketplaceModule]: router instance is not provided');
  }
};

export const NftMarketplaceMarketplaceModule = {
  name: 'NftMarketplaceMarketplaceModule',
  deps: [
    'EnvModule',
    'AuthModule',
    'NftItemsModule'
  ],
  install
};
