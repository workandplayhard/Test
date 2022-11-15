import { walletRouter } from '@/modules/wallet/router';

const install = (Vue, options = {}) => {
  if (install.installed) return;
  install.installed = true;

  const { router } = options;

  if (router) {
    for (const route of walletRouter) {
      router.addRoute(route);
    }
  } else {
    throw Error('[NftMarketplaceWalletModule]: router instance is not provided');
  }
};

export const NftMarketplaceWalletModule = {
  name: 'NftMarketplaceWalletModule',
  deps: [
    'EnvModule'
  ],
  install
};
