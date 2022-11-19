import { blocksGenerator, normalizeBlocksObject } from '@/casimir-framework/vue-layout-schema';
import { defaultLayoutComponents } from '../helpers/defaultLayoutsComponents';

const {
  VSimpleTable
} = defaultLayoutComponents;

export const tableBlocks = {
  title: 'Table',
  blocks: [
    ...blocksGenerator([
      {
        blockName: 'Table',
        component: VSimpleTable,
        icon: 'mdi-table',
        children: []
      }
    ]),
    ...normalizeBlocksObject([
      {
        is: 'tr',
        name: 'Table row',
        icon: 'mdi-table-row',
        children: []
      },
      {
        is: 'td',
        name: 'Table cell',
        icon: 'mdi-border-outside',
        data: {
          attrs: {
            title: { type: String },
            width: { type: String }
          }
        },
        children: []
      }
    ])
  ]
};
