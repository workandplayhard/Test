<template>
  <vex-section>
    <ve-stack>
      <vex-section-title
        title="Asset Details"
      />
      <asset-details :assetId="assetId"/>
    </ve-stack>
  </vex-section>
</template>

<script>
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { MBtn } from '@/components';

  import AssetDetails from './AssetDetails';

  export default {
    name: 'AssetsDetailsPage',

    components: {
      MBtn,
      VexSection,
      VexSectionTitle,
      VeStack,
      AssetDetails
    },

    props: {
      assetId: {
        type: String,
        default: null
      },
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
