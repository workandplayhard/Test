<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('moderation.title')"
      />
      <v-tabs
        background-color="transparent"
        centered
        fixed-tabs
        class="transparent"
      >
        <v-tab :to="{name: 'moderation.pending'}">
          {{ $t('moderation.pending') }}
        </v-tab>
        <v-tab :to="{name: 'moderation.reviewed'}">
          {{ $t('moderation.reviewed') }}
        </v-tab>
      </v-tabs>
      <router-view />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  // import { awaitForStore } from '@casimir.one/platform-util';

  export default {
    name: 'ModerationPage',

    components: {
      VexSection,
      VexSectionTitle,
      VeStack
    },

    created() {
      // awaitForStore(this.$store, 'currentPortal/data').then(this.checkRole);
    },

    methods: {
      checkRole() {
        // const { moderators = [] } = this.$currentPortal?.profile?.settings?.moderation || {};
        // const isModerator = moderators.includes(this.$currentUser?._id);

        // if (!isModerator) {
        //   this.$router.push({ name: 'home' });
        // }
      }
    }
  };
</script>
