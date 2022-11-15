<template>
  <v-sheet
    min-height="100vh"
    class="d-flex flex-column align-center justify-center pa-16 transparent"
  >
    <v-card
      class="mx-auto pa-12 mb-6"
      outlined
      max-width="416"
      width="100%"
    >
      <ve-stack :gap="32" class="text-center">
        <div class="text-h3">
          {{ $t('auth.signInToContinue') }}
        </div>

        <!-- XXX: Put your portal name here -->
        <o-auth
          name="NFT marketplace"
          @success="handleSignInSuccess"
          @error="handleSignInError"
        />
      </ve-stack>
    </v-card>
  </v-sheet>
</template>

<script>
  import { VeStack } from '@casimir.one/vue-elements';
  import OAuth from '../OAuth';

  export default {
    name: 'SignIn',
    components: {
      VeStack,
      OAuth
    },

    methods: {
      handleSignInSuccess() {
        this.$notifier.showSuccess(this.$t('auth.signInSuccess'));
        this.$router.push({ name: 'home' });
      },
      handleSignInError(error) {
        this.$notifier.showError(error);
      }
    }
  };
</script>
