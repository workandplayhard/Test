<template>
  <vex-block>
    <ve-stack class="mb-6" :gap="24">
      <div class="d-flex justify-space-between align-center text-h6">
        <div>
          {{ $t('components.collectionCreateDialog.balance') }}
        </div>
        <div>
          {{ balance.amount }} {{ balance.symbol }}
        </div>
      </div>
      <div>
        {{ $t('components.collectionCreateDialog.feeMessage') }}
      </div>
    </ve-stack>
  </vex-block>
</template>

<script>
  import { VexBlock } from '@casimir.one/vuetify-extended';
  import { VeStack } from '@casimir.one/vue-elements';

  export default {
    name: 'CollectionFormInfo',

    components: {
      VexBlock,
      VeStack

    },

    computed: {
      defaultFungibleToken() {
        return this.$store.getters.defaultFungibleToken;
      },
      balance() {
        return this.$store.getters['balances/balance'];
      }
    },

    created() {
      this.getUserBalance();
    },

    methods: {
      getUserBalance() {
        this.$store.dispatch('getCurrentUserBalance');
      }
    }
  };
</script>
