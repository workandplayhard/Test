<template>
  <v-sheet
    :min-height="sheetHeight"
    class="d-flex flex-column align-center justify-center pa-16 transparent"
  >
    <v-card
      outlined
      max-width="857"
      min-height="495"
      width="100%"
    >
      <div class="d-flex align-center justify-center mt-6">
        <h4 class="text-h4">
          {{ $t('wallet.title') }}
        </h4>
      </div>
      <div class="d-flex align-center justify-center mt-2 ">
        <div class="text-body-1 mr-2 grey--text text--lighten-1">
          {{ $currentUser.address }}
        </div>
        <m-btn
          icon
          small
          kind="secondary"
          width="24"
          height="24"
          :title="$t('wallet.copy')"
          @click="handleCopyAccountAddressClick"
        >
          <v-icon size="16">
            mdi-content-copy
          </v-icon>
        </m-btn>
      </div>
      <v-divider class="mt-11" />

      <span class="deip-icon">
        <img
          src="@/assets/deip.svg"
          height="36"
          width="36"
          alt=""
        >
      </span>
      <div class="d-flex flex-column align-center justify-center mt-6">
        <h3 class="text-h3">
          {{ balance.amount }} {{ balance.symbol }}
        </h3>
        <div class="align-center mt-6">
          <m-btn
            :href="assetsLink"
            target="_blank"
            small
            kind="secondary"
            class="ma-3"
          >
            {{ $t('wallet.assets') }}
          </m-btn>

          <m-btn
            :href="transactionsLink"
            target="_blank"
            small
            kind="secondary"
            class="ma-3"
          >
            {{ $t('wallet.transactions') }}
          </m-btn>
          <m-btn
            :href="depositLink"
            target="_blank"
            small
            kind="secondary"
            class="ma-3"
          >
            {{ $t('wallet.depositButton') }}
          </m-btn>
        </div>
      </div>
    </v-card>
  </v-sheet>
</template>

<script>
  import { MBtn } from '@/components/MBtn';
  import { APP_BAR_HEIGHT } from '@/constants';

  export default {
    name: 'Wallet',
    components: {
      MBtn
    },

    data() {
      return {
        transactionsLink: `${this.$env.WALLET_URL}/transactions`,
        depositLink: `${this.$env.WALLET_URL}/action/receive?address=${this.$currentUser.address}`,
        assetsLink: `${this.$env.WALLET_URL}`
      };
    },

    computed: {
      sheetHeight() {
        return `calc(100vh - ${APP_BAR_HEIGHT}px)`;
      },
      balance() {
        return this.$store.getters['balances/balance'];
      }
    },

    created() {
      this.getUserBalance();
    },

    methods: {
      handleCopyAccountAddressClick() {
        navigator.clipboard.writeText(this.$currentUser.address);
        this.$notifier.showSuccess(this.$t('wallet.copyAccountAddressSuccess'));
      },
      getUserBalance() {
        this.$store.dispatch('getCurrentUserBalance');
      }
    }

  };
</script>

<style lang="scss" scoped>

.v-slide-group__wrapper{
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}

.deip-icon {
  width: 58px;
  height: 58px;
  display: flex;
  background-color:  #FFFFFF;
  margin-left: auto;
  margin-right: auto;
  margin-top: -29px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.12);
}

</style>
