import { VChip } from 'vuetify/lib/components';
import { defineComponent } from '@/casimir-framework/all';
import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';

export default defineComponent({
  name: 'AssetStatus',

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    getStatusLabel(status) {
      return this.$t(`components.assetCard.status.${NftItemMetadataDraftStatus[status]}`);
    }
  },

  render() {
    const { status } = this.schemaData.data;

    if (!status) return null;

    return <VChip outlined> { this.getStatusLabel(status) } </VChip>;
  }
});
