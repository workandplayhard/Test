import { AssetList } from '../components/AssetList';
import { ConceptPage } from '../components/ConceptPage';
import { AssetDetails } from '../components/AssetDetails';
import { AssetCreatePage } from '../components/AssetCreatePage';


export const marketplaceRouter = [
  {
    path: '/',
    component: { template: '<div><router-view name="dialog"/><router-view /></div>' },
    meta: { auth: false },
    children: [
      {
        name: 'concept',
        path: '',
        component: ConceptPage,
        meta: { auth: false }
      },
      {
        name: 'marketplace',
        path: 'asset/list',
        component: AssetList,
        meta: { auth: false }
      },
      {
        name: 'assetCreate',
        path: 'asset/create',
        component: AssetCreatePage,
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
            mainRoute: { name: 'concept' },
            isDraft: true
          })
        }
      }
    ]
  }
];
