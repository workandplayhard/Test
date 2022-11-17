import { VChip } from 'vuetify/lib/components';
import { defineComponent } from '@/casimir-framework/all';
import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';

export default defineComponent({
  name: 'AssetStatus',

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    },
    textAlign: {
      type: String,
      default: "left"
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

    return <div style={{"text-align": this.textAlign}}>
        <VChip outlined> { this.getStatusLabel(status) } </VChip>
      </div>;
  }
});
