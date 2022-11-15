import { blocksGenerator } from '@casimir.one/vue-layout-schema';
import { AttributeScope } from '@casimir.one/platform-core';

import CollectionFormInfo from '@/components/CollectionCreateDialog/CollectionFormInfo';
import {
  AssetCreatedAt,
  AssetCollectionName,
  AssetStatus,
  AssetAuthor
} from '@/components';

export const layoutBuilderElements = {
  blocks: [
    {
      title: 'Components',
      blocks: [
        ...blocksGenerator([
          {
            component: CollectionFormInfo,
            icon: 'mdi-folder-information',
            blockType: 'simple',
            layoutType: 'form',
            scope: [AttributeScope.NFT_COLLECTION]
          }
        ])
      ]
    },
    {
      title: 'Asset',
      blocks: [
        ...blocksGenerator([
          {
            component: AssetCreatedAt,
            icon: 'mdi-calendar',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetCollectionName,
            icon: 'mdi-image-multiple',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetStatus,
            icon: 'mdi-credit-card-chip-outline',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          },
          {
            component: AssetAuthor,
            icon: 'mdi-account',
            blockType: 'simple',
            layoutType: 'details',
            scope: [AttributeScope.NFT_ITEM],
            disabledProps: ['schemaData']
          }
        ])
      ]
    }
  ],
  components: {
    CollectionFormInfo,
    AssetCreatedAt,
    AssetCollectionName,
    AssetStatus,
    AssetAuthor
  }
};
