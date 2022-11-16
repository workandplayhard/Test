import { SYSTEM_ROLE } from '@/constants';

import { ModerationPage } from '../components/ModerationPage';
import { PendingAssetsList } from '../components/PendingAssetsList';
import { ReviewedAssetsList } from '../components/ReviewedAssetsList';

export const moderationRouter = [
  {
    name: 'moderation',
    path: '/moderation',
    component: ModerationPage,
    meta: {
      auth: [SYSTEM_ROLE.ANY]
    },
    redirect: { name: 'moderation.pending' },
    children: [
      {
        path: 'pending',
        name: 'moderation.pending',
        component: PendingAssetsList
      },
      {
        path: 'reviewed',
        name: 'moderation.reviewed',
        component: ReviewedAssetsList
      }
    ]
  }
];
