<template>
  <!-- <nft-items-infinite-scroll
    v-slot="{list}"
    :filter="filter"
    is-draft
    class="py-6"
  >
    <ve-auto-grid
      cols="1"
      cols-sm="2"
      cols-lg="4"
    >
      <nft-item-draft-moderation-card
        v-for="asset in list"
        :key="asset._id"
        :nft-item-draft="asset"
        name-attribute-key="nftItem.name"
        :success-approve-message="$t('moderation.pendingAssets.approveSuccess')"
        :success-decline-message="$t('moderation.pendingAssets.declineSuccess')"
      />
    </ve-auto-grid>
  </nft-items-infinite-scroll> -->
  <div>
    PENDING ASSETS LIST
  </div>
</template>

<script>
  import { NftItemMetadataDraftStatus } from '@/constants';
  // import { NftItemsInfiniteScroll, NftItemDraftModerationCard } from '@casimir.one/nft-items-module';
  import { VeAutoGrid } from '@/components/vue-elements';

  export default {
    name: 'PendingAssetsList',

    components: {
      // NftItemDraftModerationCard,
      // NftItemsInfiniteScroll,
      VeAutoGrid
    },

    data() {
      return {
        filter: {
          status: NftItemMetadataDraftStatus.PROPOSED,
          lazySellProposalId: { $exists: true }
        }
      };
    }
  };
</script>
