<template>
  <ve-stack class="mt-4">
    <div class="d-flex justify-end">
      <v-select
        v-model="status"
        :label="$t('moderation.reviewedAssets.filter.label')"
        :items="statuses"
        class="status-select"
        hide-details
      />
    </div>

    <nft-items-infinite-scroll
      v-slot="{list}"
      :filter="filter"
      :sort="sort"
      is-draft
    >
      <ve-auto-grid
        cols="1"
        cols-sm="2"
        cols-lg="4"
      >
        <asset-card
          v-for="asset in list"
          :key="asset._id"
          :asset="asset"
          is-draft
          add-assets-details-modal
        />
      </ve-auto-grid>
    </nft-items-infinite-scroll>
  </ve-stack>
</template>

<script>
  import { VeStack, VeAutoGrid } from '@/casimir-framework/vue-elements';
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
  import { NftItemsInfiniteScroll } from '@/casimir-framework/modules/nft-items';

  import { AssetCard } from '@/components';

  export default {
    name: 'ReviewedAssetsList',

    components: {
      VeStack,
      VeAutoGrid,
      AssetCard,
      NftItemsInfiniteScroll
    },

    data() {
      const statuses = [
        {
          text: this.$t('moderation.reviewedAssets.filter.showAll'),
          value: {
            $in: [NftItemMetadataDraftStatus.APPROVED,
                  NftItemMetadataDraftStatus.REJECTED]
          }
        },
        {
          text: this.$t('moderation.reviewedAssets.filter.approved'),
          value: NftItemMetadataDraftStatus.APPROVED
        },
        {
          text: this.$t('moderation.reviewedAssets.filter.denied'),
          value: NftItemMetadataDraftStatus.REJECTED
        }
      ];

      return {
        statuses,
        status: statuses[0].value,
        sort: { createdAt: 'desc' }
      };
    },

    computed: {
      filter() {
        return {
          status: this.status,
          lazySellProposalId: { $exists: true }
        };
      }
    }
  };
</script>

<style lang="scss" scoped>
  .status-select {
    max-width: 200px;
  }
</style>
