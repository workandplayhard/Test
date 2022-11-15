import { proxydi } from '@casimir.one/proxydi';

const GETTERS = {
  defaultFungibleToken: (state) => state.assets.data
    .find((asset) => asset.symbol === proxydi.get('env').CORE_ASSET.symbol),
  userNftCollection: (state) => {
    const currentUser = state.currentUser.data;
    if (!currentUser) return null;
    return state.nftCollections.data
      .find((nftCollection) => nftCollection.issuer === currentUser._id);
  }
};

const ACTIONS = {
  getCurrentUserNftCollection({ rootGetters, dispatch }) {
    const currentUser = rootGetters['currentUser/data'];

    if (currentUser) {
      dispatch('nftCollections/getListByIssuer', currentUser._id, { root: true });
    }
  },
  getCurrentUserBalance({ rootGetters, dispatch }) {
    const currentUser = rootGetters['currentUser/data'];

    if (currentUser) {
      dispatch('balances/getBalance', currentUser.address);
    }
  }
};

export const store = {
  getters: GETTERS,
  actions: ACTIONS
};
