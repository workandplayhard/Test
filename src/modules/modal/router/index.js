import { SYSTEM_ROLE } from '@/casimir-framework/vars';

import { ModalPage } from '../components/ModalPage';

export const modalRouter = [
  {
    name: 'modal',
    path: '/modal',
    component: ModalPage,
    meta: {
      auth: [SYSTEM_ROLE.ANY]
    },
  }
];
