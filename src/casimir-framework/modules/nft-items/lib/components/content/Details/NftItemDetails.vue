<template>
  <vex-block v-if="nftItem">
    <layout-renderer
      :value="nftItem"
      :schema="internalSchema"
      :schema-data="internalSchemaData"
    />
  </vex-block>
</template>

<script>
  import { defineComponent } from '@/casimir-framework/all';
  import { AttributeScope } from '@/casimir-framework/vars';
  import { VexBlock } from '@/plugins/VuetifyExtended';
  import { attributedDetailsFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { attributeMethodsFactory, expandAttributes } from '@/casimir-framework/modules/attributes';

  /**
   * Component for NFT item details
   */
  export default defineComponent({
    name: 'NftItemDetails',

    components: {
      VexBlock,
      LayoutRenderer
    },
    mixins: [
      attributedDetailsFactory('nftItem')
    ],

    computed: {

      internalSchemaData() {
        return {
          ...attributeMethodsFactory(
            expandAttributes(this.nftItem),
            {
              scopeName: AttributeScope.NFT_ITEM,
              scopeId: this.nftItem._id
            }
          ),
          ...this.schemaData
        };
      }
    }
  });
</script>
