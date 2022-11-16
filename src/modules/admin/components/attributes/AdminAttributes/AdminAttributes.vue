<template>
  <vex-section>
    <ve-stack :gap="24">
      <vex-section-title
        :title="$t('admin.attributes.title')"
        class="align-center"
      >
        <template #append>
          <m-btn
            small
            kind="primary"
            outlined
            class="mr-4"
            :to="{ name: 'admin.attributes.settings' }"
          >
            <v-icon left>
              mdi-tune-vertical
            </v-icon>
            {{ $t('admin.attributes.settings') }}
          </m-btn>
          <m-btn
            small
            kind="primary"
            depressed
            :to="{ name: 'admin.attributes.create' }"
          >
            <v-icon left>
              mdi-puzzle-plus-outline
            </v-icon>
            {{ $t('admin.attributes.attribute.create') }}
          </m-btn>
        </template>
      </vex-section-title>
      <!-- <attributes-list
        :on-click-edit="onClickEdit"
        :on-click-remove="onClickRemove"
      /> -->
    </ve-stack>
  </vex-section>
</template>

<script>
  // import { AttributesList } from '@casimir.one/attributes-module';
  import { MBtn } from '@/components/MBtn';
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack } from '@/components/vue-elements';

  export default {
    name: 'AdminAttributes',
    components: {
      // AttributesList,
      MBtn,
      VeStack,
      VexSection,
      VexSectionTitle
    },
    methods: {
      onClickEdit({ _id }) {
        this.$router.push({
          name: 'admin.attributes.edit',
          params: {
            attributeId: _id
          }
        });
      },

      isAttributeInSettings(attributeId) {
        return this.$store.getters['attributes/settings']
          ?.map?.find((setting) => setting.value === attributeId);
      },

      async onClickRemove(attributeId) {
        const message = this.isAttributeInSettings(attributeId)
          ? this.$t('admin.attributes.attribute.removeInSettings')
          : this.$t('admin.attributes.attribute.remove');
        try {
          const isConfirmed = await this.$confirm(message, {
            title:
              this.$t('admin.attributes.attribute.removeTitle')
          });
          if (!isConfirmed) return;
          await this.$store.dispatch('attributes/remove', attributeId);
          this.$notifier.showSuccess(this.$t('admin.attributes.attribute.removeSuccess'));
        } catch (error) {
          console.error(error);
          this.$notifier.showError(this.$t('admin.attributes.attribute.removeError'));
        }
      }
    }
  };
</script>
