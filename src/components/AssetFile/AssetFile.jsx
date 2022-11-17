import { defineComponent } from '@/casimir-framework/all';
import { VexImage } from '@/plugins/VuetifyExtended';

export default defineComponent({
  name: 'AssetFile',

  components: {
    VexImage
  },

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {

    assetUrl() {
      const { attributes, nftCollectionId, nftItemId } = this.schemaData.data;
      const arr = Object.keys(attributes).reduce((arr, key) => {
        return [...arr, { attributeId: key, value: attributes[key] }];
      }, []);
      const image = this.$attributes.getMappedData('nftItem.image', arr);
      if (!image) return null;

      const scopeId = JSON.stringify({
        nftCollectionId: nftCollectionId,
        nftItemId: nftItemId
      });

      return this.$attributes.getFileSrc({
        scope: 'nftItem',
        scopeId,
        attributeId: image.attributeId,
        filename: image.value
      });
    },

    minImageWidth() {
      return this.$vuetify.breakpoint.xs ? null : '500';
    },
  },

  render() {
    return <vex-image 
      height="500" 
      width="100%"
      min-width={this.minImageWidth}
      content-class="responsive-image" 
      full-view 
      src={this.assetUrl} />;
  }
});
