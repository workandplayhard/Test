<template>
  <nft-items-infinite-scroll
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
  </nft-items-infinite-scroll>
</template>

<script>
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
  import { NftItemsInfiniteScroll, NftItemDraftModerationCard } from '@/casimir-framework/modules/nft-items';
  import { VeAutoGrid } from '@/casimir-framework/vue-elements';

  export default {
    name: 'PendingAssetsList',

    components: {
      NftItemDraftModerationCard,
      NftItemsInfiniteScroll,
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
