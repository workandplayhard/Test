<template>
  <div>
    <v-card
      outlined
      class="nft-card"
      @click="onCardClick"
    >
      ASSET CARD
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
      <!-- <layout-renderer
        :value="asset"
        :schema="cardSchema"
        :schema-data="cardSchemaData"
      /> -->
    </v-card>
    <asset-details
      v-if="addAssetsDetailsModal && isAssetDetailsDialogOpen"
      :id="asset._id"
      v-model="isAssetDetailsDialogOpen"
      :is-draft="isDraft"
    />
  </div>
</template>

<script>
  // import { NftItemMetadataDraftStatus } from '@casimir.one/platform-core';
  // import { dateMixin } from '@casimir.one/platform-components';
  import { dateMixin } from '@/casimir';
  // import { attributedDetailsFactory, LayoutRenderer } from '@casimir.one/layouts-module';
  // import { attributeMethodsFactory, expandAttributes } from '@casimir.one/attributes-module';

  import { MBtn } from '@/components/MBtn';
  // import AssetDetails from '@/modules/marketplace/components/AssetDetails/AssetDetails';
  import AssetDetails from './../AssetDetails';

  export default {
    name: 'AssetCard',

    components: {
      MBtn,
      AssetDetails,
      // LayoutRenderer
    },

    mixins: [dateMixin, /* attributedDetailsFactory('asset') */],

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
        isAssetDetailsDialogOpen: false
      };
    },

    computed: {
      cardSchema() {
        // return this.$layouts.getMappedData('nftItem.card')?.value;
      },

      cardSchemaData() {
        // const scopeId = !this.isDraft ? this.asset._id : {
        //   nftItemId: this.asset.nftItemId,
        //   nftCollectionId: this.asset.nftCollectionId
        // };
        // return {
        //   ...attributeMethodsFactory(
        //     expandAttributes(this.asset),
        //     {
        //       scopeName: 'nftItem',
        //       scopeId
        //     }
        //   ),
        //   ...this.schemaData
        // };
      },

      isCopyLinkShown() {
        return true; //this.isDraft && this.asset.status === NftItemMetadataDraftStatus.APPROVED;
      }
    },

    methods: {
      handleCopyLinkClick() {
        // const props = this.$router.resolve({
        //   name: 'assetDetails',
        //   params: { id: this.asset._id }
        // });

        // navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        // this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      },

      onCardClick() {
        this.isAssetDetailsDialogOpen = true;
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
