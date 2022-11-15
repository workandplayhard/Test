<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('profile.createdAssets.allNfts')"
      >
        <template #append>
          <v-select
            v-model="filter"
            :label="$t('profile.createdAssets.filter')"
            :items="filterOptions"
          />
        </template>
      </vex-section-title>

      <nft-items-infinite-scroll ref="scroll" :filter="filter" is-draft>
        <template #default="{ list }">
          <ve-auto-grid
            cols="1"
            cols-sm="2"
            cols-lg="4"
          >
            <asset-card
              v-for="asset in list"
              :key="asset._id"
              :asset="asset"
              add-assets-details-modal
              is-draft
            />
          </ve-auto-grid>
        </template>
      </nft-items-infinite-scroll>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@casimir.one/vuetify-extended';
  import { VeStack, VeAutoGrid } from '@casimir.one/vue-elements';
  import { NftItemsInfiniteScroll } from '@casimir.one/nft-items-module';
  import { NftItemMetadataDraftStatus } from '@casimir.one/platform-core';

  import { AssetCard } from '@/components';

  export default {
    name: 'CreatedAssets',
    components: {
      VexSection,
      VexSectionTitle,
      VeStack,
      VeAutoGrid,
      NftItemsInfiniteScroll,
      AssetCard
    },
    data() {
      const filter = {
        authors: this.$currentUser._id,
        lazySellProposalId: { $exists: true }
      };
      const filterOptions = [
        {
          text: this.$t('profile.createdAssets.showAll'),
          value: {
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.created'),
          value: {
            status: NftItemMetadataDraftStatus.PROPOSED,
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.declined'),
          value: {
            status: NftItemMetadataDraftStatus.REJECTED,
            ...filter
          }
        },
        {
          text: this.$t('profile.createdAssets.approved'),
          value: {
            status: NftItemMetadataDraftStatus.APPROVED,
            ...filter
          }
        }

      ];

      return {
        loading: false,
        filter,
        filterOptions
      };
    },

    mounted() {
      this.$eventBus.$on('submit-asset', this.$refs.scroll.resetInfiniteScroll);
    },

    beforeDestroy() {
      this.$eventBus.$off('submit-asset', this.$refs.scroll.resetInfiniteScroll);
    }
  };
</script>
