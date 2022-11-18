<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        :title="$t('marketplace.createAsset.formTitle')"
      />
      <div class="d-flex align-center justify-center">
        <asset-create-form
          ref="createAssetForm"
          class="d-block d-flex"
          @success="handleCreateSuccess"
        />
      </div>
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
