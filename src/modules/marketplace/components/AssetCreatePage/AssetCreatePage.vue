<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('marketplace.createAsset.formTitle')"
      />
        <asset-create-form
          ref="createAssetForm"
          @success="handleCreateSuccess"
        />
      <router-view />
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import AssetCreateForm from './AssetCreateForm';

  export default {
    name: 'AssetCreatePage',

    components: {
      AssetCreateForm,
      VexSection,
      VexSectionTitle,
      VeStack
    },

    created() {
    },

    methods: {
      handleCreateSuccess() {

      },
    }
  };
</script>
