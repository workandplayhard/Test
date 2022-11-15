<template>
  <div>
    <m-btn class="oauth-button" :loading="loading" @click="handleOAuth">
      <img
        class="oauth-button__logo mr-2"
        src="@/assets/wallet_logo.png"
        height="30"
        width="30"
        alt=""
      >
      {{ $t('auth.connectWallet') }}
    </m-btn>
  </div>
</template>

<script>
  import { MBtn } from '@/components/MBtn';

  export default {
    name: 'OAuth',

    components: {
      MBtn
    },

    props: {
      name: {
        type: String,
        default: 'Portal'
      },
      url: {
        type: String,
        default: window.location.origin
      }
    },

    data() {
      return {
        oAuthUrl: [
          `${this.$env.WALLET_URL}/account/oauth`,
          `?url=${this.url}`,
          `&name=${this.name}`,
          `&portalId=${this.$env.TENANT}`,
          `&seed=${this.$env.SIG_SEED}`,
          '&ext=true'
        ].join(''),
        loading: false
      };
    },

    computed: {
      oAuthWindowProps() {
        const left = (window.screen.width - 400) / 2;
        const top = (window.screen.height - 640) / 2;

        const options = {
          popup: true,
          width: 420,
          height: 600,
          menubar: 'no',
          toolbar: 'no',

          top,
          left
        };

        return Object.keys(options)
          .reduce((acc, key) => `${acc},${key}=${options[key]}`, '');
      }
    },

    mounted() {
      this.addOAuthListener();
    },

    beforeDestroy() {
      this.removeOAuthListener();
    },

    methods: {
      handleOAuth() {
        this.loading = true;

        window.open(
          this.oAuthUrl,
          '_blank',
          this.oAuthWindowProps
        );
      },

      async handleOAuthSuccess(evt) {
        const { data } = evt;

        if (data?.channel === 'Deip.Wallet') {
          this.loading = true;

          try {
            const res = await this.$store.dispatch('auth/walletSignIn', data);
            this.emitSuccess(res);
          } catch (e) {
            this.emitError(e.message);
          }

          this.loading = false;
        }
      },

      addOAuthListener() {
        window.addEventListener('message', this.handleOAuthSuccess);
      },

      removeOAuthListener() {
        window.removeEventListener('message', this.handleOAuthSuccess);
      },

      emitSuccess(data) {
        this.$emit('success', data);
      },

      emitError(error) {
        this.$emit('error', error);
      }
    }
  };
</script>
