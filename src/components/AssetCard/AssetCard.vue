<template>
  <v-card
    outlined
    class="nft-card"
  >
    <div v-if="isCopyLinkShown" class="button-container d-flex justify-end mt-4 mr-4">
      <m-btn
        icon
        small
        kind="secondary"
        class="white"
        :title="$t('components.assetCard.copyLink')"
        @click.prevent="handleCopyLinkClick"
      >
        <v-icon>mdi-link</v-icon>
      </m-btn>
    </div>
    <layout-renderer
      :value="asset"
      :schema="cardSchema"
      :schema-data="cardSchemaData"
    />
  </v-card>
</template>

<script>
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
  import { dateMixin } from '@/casimir-framework/all';
  import { attributedDetailsFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { attributeMethodsFactory, expandAttributes } from '@/casimir-framework/modules/attributes';
  import { MBtn } from '@/components/MBtn';

  export default {
    name: 'AssetCard',

    components: {
      MBtn,
      LayoutRenderer
    },

    mixins: [dateMixin, attributedDetailsFactory('asset')],

    props: {
      addAssetsDetailsModal: {
        type: Boolean,
        default: false
      },
      isDraft: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
      };
    },

    computed: {
      cardSchema() {
        return this.$layouts.getMappedData('nftItem.card')?.value;
      },

      cardSchemaData() {
        const scopeId = !this.isDraft ? this.asset._id : {
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

      isCopyLinkShown() {
        return this.isDraft && this.asset.status === NftItemMetadataDraftStatus.APPROVED;
      }
    },

    methods: {
      handleCopyLinkClick() {
        const props = this.$router.resolve({
          name: 'assetDetails',
          params: { assetId: this.asset._id }
        });

        navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      }
    }

  };
</script>

<style scoped lang="scss">
  .button-container {
    position: absolute;
    width: 100%;
    right: 5px;
    z-index: 1;
  }
</style>
