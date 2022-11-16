<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('marketplace.assetList.allNfts')"
      >
      </vex-section-title>

      <nft-items-infinite-scroll
        ref="scroll"
        :sort="sort"
        :filter="filter"
        is-draft
      >
        <template #default="{ list }">
          <ve-auto-grid
            cols="1"
            cols-sm="2"
            cols-lg="4"
          >
            <router-link
              v-for="asset in list"
              :key="asset._id"
              :to="{ name: 'assetDetails', params: {id: asset._id} }"
              class="text-decoration-none"
            >
              <asset-card :asset="asset" is-draft />
            </router-link>
          </ve-auto-grid>
        </template>
      </nft-items-infinite-scroll>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack, VeAutoGrid } from '@/casimir-framework/vue-elements';
  import { AssetCard, MBtn } from '@/components';
  import { NftItemsInfiniteScroll } from '@/casimir-framework/modules/nft-items';
  import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';

  export default {
    name: 'AssetList',

    components: {
      MBtn,
      AssetCard,
      VexSection,
      VexSectionTitle,
      VeStack,
      VeAutoGrid,
      NftItemsInfiniteScroll
    },

    data() {
      return {
        loading: false,
        NftItemMetadataDraftStatus,
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
          status: NftItemMetadataDraftStatus.APPROVED,
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
