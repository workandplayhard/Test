<template>
  <v-sheet>
    <v-btn
      class="mt-2 ml-2"
      icon
      style="pointer-events: all"
      @click="$router.back()"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <vex-section max-width="800" class="mx-auto pa-0">
      <ve-stack :gap="32">
        <vex-section-title
          :title="$t('admin.layouts.settings')"
        />
        {{ $layouts.getMappedData('user.details') }}
        <layouts-settings
          v-if="Object.keys(settings).length"
          :value="settings"
          @success="onSuccess"
          @error="onError"
        />
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';

  import { LayoutsSettings } from '@/casimir-framework/modules/layouts';

  export default {
    name: 'AdminLayoutsSettings',

    components: {
      LayoutsSettings,

      VeStack,
      VexSection,
      VexSectionTitle
    },

    computed: {
      settings() {
        return this.$store.getters['layouts/settings'];
      }
    },

    methods: {
      onSuccess() {
        this.$notifier.showSuccess(this.$t('admin.layouts.layout.updateSuccess'));

        this.$router.push({
          name: 'admin.layouts'
        });
      },

      onError(error) {
        this.$notifier.showError(error);
      }
    }
  };
</script>
