import { SYSTEM_ROLE } from '@casimir.one/platform-core';

import { Wallet } from '@/modules/wallet/components/Wallet';

export const walletRouter = [
  {
    path: '/wallet',
    name: 'wallet',
    component: Wallet,
    meta: {
      auth: [SYSTEM_ROLE.ANY]
    }
  }
];
