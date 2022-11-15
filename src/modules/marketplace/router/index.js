import { AssetList } from '../components/AssetList';
import { AssetDetails } from '../components/AssetDetails';

export const marketplaceRouter = [
  {
    path: '/',
    component: { template: '<div><router-view name="dialog"/><router-view /></div>' },
    meta: { auth: false },
    children: [
      {
        name: 'marketplace',
        path: '',
        component: AssetList,
        meta: { auth: false }
      },
      {
        name: 'assetDetails',
        path: 'asset/:id',
        components: {
          default: AssetList,
          dialog: AssetDetails
        },
        meta: { auth: false },
        props: {
          dialog: (route) => ({
            value: true,
            id: route.params.id,
            mainRoute: { name: 'marketplace' },
            isDraft: true
          })
        }
      }
    ]
  }
];
