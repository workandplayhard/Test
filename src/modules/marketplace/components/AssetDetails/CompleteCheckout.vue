<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-6">
      <div class="d-flex align-center">
        <v-img
          height="52"
          width="52"
          :src="assetUrl"
          class="image mr-6"
        />
        <div>
          <div class="text-h6">
            {{ title }}
          </div>
          <div class="text-subtitle-3 grey--text text--lighten-2">
            {{ creatorName }}
          </div>
        </div>
      </div>
    </div>
    <v-divider />
    <ve-stack class="d-flex flex-column mt-8 text-h6 mb-6" :gap="24">
      <div class="d-flex justify-space-between align-center">
        <div>
          {{ $t('marketplace.assetDetails.balance') }}
        </div>
        <div>
          {{ balance.amount }} {{ balance.symbol }}
        </div>
      </div>
      <div class="d-flex justify-space-between align-center">
        <div>
          {{ $t('marketplace.assetDetails.price') }}
        </div>
        <div>
          {{ price.amount }} {{ price.symbol }}
        </div>
      </div>
    </ve-stack>
    <div class="d-flex justify-end">
      <m-btn
        kind="primary"
        large
        :loading="loading"
        @click="buyLazy"
      >
        {{ $t('marketplace.assetDetails.checkout') }}
      </m-btn>
    </div>
  </div>
</template>

<script>
  import { MBtn } from '@/components';
  import { VeStack } from '@casimir.one/vue-elements';

  export default {
    name: 'CompleteCheckout',
    components: {
      MBtn,
      VeStack
    },

    props: {
      asset: {
        type: Object,
        required: true
      },
      creatorName: {
        type: String,
        required: true
      },
      assetUrl: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        loading: false
      };
    },

    computed: {
      defaultFungibleToken() {
        return this.$store.getters.defaultFungibleToken;
      },
      balance() {
        return this.$store.getters['balances/balance'];
      },
      price() {
        return this.$attributes
          .getMappedData('nftItem.price', this.asset.attributes)?.value;
      },
      title() {
        return this.$attributes
          .getMappedData('nftItem.name', this.asset.attributes)?.value;
      }
    },

    created() {
      this.getUserBalance();
    },

    methods: {
      async buyLazy() {
        this.loading = true;
        try {
          const {
            nftCollectionId,
            nftItemId,
            lazySellProposalId
          } = this.asset;

          const payload = {
            initiator: this.$currentUser,
            data: {
              issuer: this.$currentUser._id,
              nftCollectionId,
              nftItemId,
              lazySellProposalId,
              asset: this.price
            }
          };

          await this.$store.dispatch('nftItemDrafts/buyLazy', payload);
          this.$notifier.showSuccess(this.$t('marketplace.assetDetails.buySuccess'));
          this.$emit('success');
          this.$eventBus.$emit('asset-purchased');
        } catch (error) {
          if (error?.message !== 'close'
            && error?.error?.message !== 'close') {
            console.error(error?.error || error);
            this.$notifier.showError(error?.error?.message || error);
          }
        }
        this.loading = false;
        this.$emit('close-dialog');
      },
      getUserBalance() {
        this.$store.dispatch('getCurrentUserBalance');
      }
    }
  };
</script>

<style scoped lang="scss">
  .image {
    border-radius: 4px;
  }
</style>
