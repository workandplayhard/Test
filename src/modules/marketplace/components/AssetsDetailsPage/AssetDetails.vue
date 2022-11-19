<template>
  <div v-if="asset && detailsSchema">
    <layout-renderer
      :value="asset"
      :schema="detailsSchema"
      :schema-data="detailsSchemaData"
    />
  </div>
</template>

<script>
  import { dateMixin } from '@/casimir-framework/all';
  import { VexImage } from '@/plugins/VuetifyExtended';
  import { attributeMethodsFactory, expandAttributes } from '@/casimir-framework/modules/attributes';
  import { attributedDetailsFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';

  import { MDialog, MBtn } from '@/components';

  export default {
    name: 'AssetDetailsComponent',

    components: {
      MDialog,
      MBtn,
      VexImage,
      LayoutRenderer
    },

    mixins: [dateMixin, attributedDetailsFactory('nftItem'), /* userHelpersMixin */],

    props: {
      assetId: {
        type: [String],
        required: true
      },
    },

    data() {
      return {
      };
    },

    computed: {
      detailsSchema() {
        return this.$layouts.getMappedData('nftItem.details')?.value;
      },

      detailsSchemaData() {
        const scopeId = {
          nftItemId: this.asset.nftItemId,
          nftCollectionId: this.asset.nftCollectionId
        };
        return {
          ...attributeMethodsFactory(
            expandAttributes(this.asset),
            {
              scopeName: 'nftItem',
              scopeId
            }
          ),
          ...this.schemaData
        };
      },

      asset() {
        return this.$store.getters['nftItemDrafts/one'](this.assetId);
      },

    },

    created() {
      this.getData();
    },

    methods: {
  
      async getData() {
        await this.$store.dispatch('nftItemDrafts/getOne', this.assetId);
      },

      handleCopyLinkClick() {
        const props = this.$router.resolve({
          name: 'assetDetails',
          params: { assetId: this.asset._id }
        });

        navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      },

    }
  };
</script>
