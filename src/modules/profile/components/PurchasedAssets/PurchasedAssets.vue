<template>
  <vex-section>
    <ve-stack>
      <nft-items-infinite-scroll :filter="filter">
        <template #default="{ list }">
          <ve-auto-grid
            cols="1"
            cols-sm="2"
            cols-lg="4"
          >
            <asset-card
              v-for="asset in list"
              :key="JSON.stringify(asset._id)"
              :asset="asset"
              add-assets-details-modal
            />
          </ve-auto-grid>
        </template>
      </nft-items-infinite-scroll>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection } from '@casimir.one/vuetify-extended';
  import { VeStack, VeAutoGrid } from '@casimir.one/vue-elements';
  import { NftItemsInfiniteScroll } from '@casimir.one/nft-items-module';
  import { AssetCard } from '@/components';

  export default {
    name: 'PurchasedAssets',
    components: {
      AssetCard,
      VexSection,
      VeStack,
      VeAutoGrid,
      NftItemsInfiniteScroll
    },
    data() {
      return {
        loading: false,
        filter: {
          ownerAddress: this.$currentUser.address
        }
      };
    }

  };
</script>
