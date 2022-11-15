<template>
  <v-sheet>
    <vex-section
      max-width="800"
      class="mx-auto"
    >
      <vex-section-title
        :title="$t('profile.editProfileTitle')"
        class="mb-11"
      />
      <user-form
        :schema="schema"
        :user="$currentUser"
        :submit-label="$t('profile.accountTab.submitLabel')"
        @success="handleSuccess"
        @error="handleError"
        @cancel="handleCancel"
      />
    </vex-section>
  </v-sheet>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@casimir.one/vuetify-extended';
  import { UserForm } from '@casimir.one/users-module';

  export default {
    name: 'EditProfile',
    components: {
      VexSection,
      VexSectionTitle,
      UserForm
    },

    computed: {
      schema() {
        return this.$layouts.getMappedData('user.form')?.value;
      }
    },

    methods: {
      handleSuccess() {
        this.$notifier.showSuccess(this.$t('profile.accountTab.editSuccess'));
        this.$router.push({ name: 'profile.details' });
      },
      handleError(error) {
        this.$notifier.showError(error);
      },
      handleCancel() {
        this.$router.push({ name: 'profile.details' });
      }
    }
  };
</script>

<style lang="scss" scoped>
.v-tabs--vertical > .v-tabs-bar .v-tab {
    height: 16px;
}

.v-tabs--vertical > .v-tabs-bar .v-tabs-slider {
    height: 16px;
}
</style>
