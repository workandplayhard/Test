<template>
  <vex-section>
    ASSETS LISTING PAGE
    <ve-stack>
      <vex-section-title
        :title="$t('marketplace.assetList.allNfts')"
      >
        <template #append>
          <v-select
            v-model="sort"
            :label="$t('marketplace.assetList.sorting')"
            :items="sortingOptions"
            class="sort-select"
          >
            <template #item="{ item }">
              <v-icon> {{ item.icon }} </v-icon>
              <div class="ml-2">
                {{ item.text }}
              </div>
            </template>
            <template #selection="{ item }">
              <v-icon> {{ item.icon }} </v-icon>
              <div class="ml-2">
                {{ item.text }}
              </div>
            </template>
          </v-select>
        </template>
      </vex-section-title>

      <!-- <nft-items-infinite-scroll
        ref="scroll"
        :sort="sort"
        :filter="filter"
        is-draft
      > -->
      <div>
        ASSETS LIST HERE
        <!-- <template #default="{ list }"> -->
          <ve-auto-grid
            cols="1"
            cols-sm="2"
            cols-lg="4"
          >
            ASSET ITEM
            <!-- <router-link
              v-for="asset in list"
              :key="asset._id"
              :to="{name: 'assetDetails', params: {id: asset._id}}"
              class="text-decoration-none"
            >
              <asset-card :asset="asset" is-draft />
            </router-link> -->
          </ve-auto-grid>
        <!-- </template> -->
      <!-- </nft-items-infinite-scroll> -->
      </div>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack, VeAutoGrid } from '@/components/vue-elements';
  import { AssetCard } from '@/components';
  // import { NftItemsInfiniteScroll } from '@casimir.one/nft-items-module';
  // import { NftItemMetadataDraftStatus } from '@casimir.one/platform-core';

  export default {
    name: 'AssetList',

    components: {
      AssetCard,
      VexSection,
      VexSectionTitle,
      VeStack,
      VeAutoGrid,
      // NftItemsInfiniteScroll
    },

    data() {
      return {
        loading: false,
        // NftItemMetadataDraftStatus,
        sort: {},
        sortingOptions: [
          {
            text: this.$t('marketplace.assetList.byDefault'),
            value: null,
            icon: null
          },
          {
            text: this.$t('marketplace.assetList.byCreationDate'),
            value: { createdAt: 'asc' },
            icon: 'mdi-sort-numeric-ascending'
          },
          {
            text: this.$t('marketplace.assetList.byCreationDate'),
            value: { createdAt: 'desc' },
            icon: 'mdi-sort-numeric-descending'
          }
        ],
        filter: {
          // status: NftItemMetadataDraftStatus.APPROVED,
          lazySellProposalId: { $exists: true }
        }
      };
    },

    mounted() {
      // this.$eventBus.$on('asset-purchased', this.$refs.scroll.resetInfiniteScroll);
    },

    beforeDestroy() {
      // this.$eventBus.$off('asset-purchased', this.$refs.scroll.resetInfiniteScroll);
    }
  };
</script>

<style lang="scss" scoped>
  .sort-select {
    width: 250px;
    max-width: 250px;
  }
</style>
