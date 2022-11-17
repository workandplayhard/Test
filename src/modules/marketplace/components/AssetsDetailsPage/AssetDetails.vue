<template>
  <div v-if="asset">
    <vex-image
      height="500"
      :min-width="minImageWidth"
      content-class="responsive-image"
      full-view
      :src="assetUrl"
    />
    <div>
      <layout-renderer
        :value="asset"
        :schema="detailsSchema"
        :schema-data="detailsSchemaData"
      />
    </div>
  </div>
</template>

<script>
  import { dateMixin } from '@/casimir-framework/all';
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
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
        return this.$layouts.getMappedData('nftItem.details').value;
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

      assetUrl() {
        const image = this.$attributes.getMappedData('nftItem.image', this.asset.attributes);
        if (!image) return null;

        const scopeId = JSON.stringify({
          nftCollectionId: this.asset.nftCollectionId,
          nftItemId: this.asset.nftItemId
        });

        return this.$attributes.getFileSrc({
          scope: 'nftItem',
          scopeId,
          attributeId: image.attributeId,
          filename: image.value
        });
      },

      minImageWidth() {
        return this.$vuetify.breakpoint.xs ? null : '500';
      },

      isApprovedAsset() {
        return this.asset.status === NftItemMetadataDraftStatus.APPROVED;
      }

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
          params: { id: this.assetId }
        });

        navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      },

    }
  };
</script>

<style  lang="scss">
  .responsive-image {
    width: 100% !important;
  }
</style>
