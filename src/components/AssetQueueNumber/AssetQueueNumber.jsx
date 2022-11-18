import { VChip } from 'vuetify/lib/components';
import { defineComponent } from '@/casimir-framework/all';
import { NftItemMetadataDraftStatus } from '@/casimir-framework/vars';

export default defineComponent({
  name: 'AssetQueueNumber',

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

  },

  render() {
    const { queueNumber, status } = this.schemaData.data;
    if (status != NftItemMetadataDraftStatus.APPROVED) 
      return null;

    return <div style={{"text-align": this.textAlign}}><span># {queueNumber}</span></div>;
  }
});
