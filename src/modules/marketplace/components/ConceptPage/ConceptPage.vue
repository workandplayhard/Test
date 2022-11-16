<template>
  <vex-section>
    <ve-stack>AssetList
      <vex-section-title
        :title="$t('marketplace.conceptPage.pageTitle')"
      >
        <template #append>
          <router-link
            :to="{ name: 'assetList' }"
            class="link text--primary d-block"
          >
            <!-- XXX: Put your logo here -->
            5 creation already
          </router-link>
        </template>
      </vex-section-title>
      <div class="d-flex align-center justify-start">
        <div class="text-body-1">
          Some description about the concept here ...
        </div>
      </div>
      <div class="d-flex align-center justify-center">
        <m-btn
          kind="primary"
          :to="{ name: 'assetCreate' }"
        >
          {{ $t('marketplace.createAsset.formTitle') }}
        </m-btn>
      </div>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { MBtn } from '@/components';

  export default {
    name: 'ConceptPage',

    components: {
      MBtn,
      VexSection,
      VexSectionTitle,
      VeStack,
    },

    data() {
      return {
      };
    },

    mounted() {
    },

    beforeDestroy() {
    }
  };
</script>
