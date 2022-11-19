// import { AssetListPage } from '../components/AssetListPage';
import { ConceptPage } from "../components/ConceptPage";
import { AssetCreatePage } from "../components/AssetCreatePage";
import { AssetsDetailsPage } from "../components/AssetsDetailsPage";

export const marketplaceRouter = [
  {
    path: "/",
    component: {
      template: '<div><router-view name="dialog"/><router-view /></div>',
    },
    meta: { auth: false },
    children: [
      {
        name: "concept",
        path: "",
        component: ConceptPage,
        meta: { auth: false },
      },
      // {
      //   name: 'assetList',
      //   path: 'asset/list',
      //   component: AssetListPage,
      //   meta: { auth: false }
      // },
      {
        name: "assetCreate",
        path: "asset/create",
        component: AssetCreatePage,
        meta: { auth: false },
      },
      {
        name: "assetDetails",
        path: "asset/details/:assetId",
        component: AssetsDetailsPage,
        meta: { auth: false },
        props: (route) => ({
          assetId: route.params.assetId,
        }),
      },
    ],
  },
];
