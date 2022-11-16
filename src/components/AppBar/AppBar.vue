<template>
  <v-app-bar
    app
    fixed
    clipped-left
    class="app-bar"
    :height="APP_BAR_HEIGHT"
  >
    <v-app-bar-title>
      <router-link
        :to="{ name: 'home' }"
        class="text-decoration-none text--primary d-block"
      >
        <!-- XXX: Put your logo here -->
        Moti
      </router-link>
    </v-app-bar-title>

    <v-spacer />

    <app-bar-user style="pointer-events: all" />
  </v-app-bar>
</template>

<script>
  import AppBarUser from '@/components/AppBar/AppBarUser';
  import { APP_BAR_HEIGHT } from '@/casimir-framework/vars';

  export default {
    name: 'AppBar',
    components: { AppBarUser },
    data() {
      return { APP_BAR_HEIGHT };
    }
  };
</script>

<style lang="scss" scoped>
  @use '@/styles/_vuetify-variables.scss' as vv;
  .app-bar {
    border-bottom: thin solid rgba(map-get(vv.$shades, 'black'), 0.12)
  }
</style>
