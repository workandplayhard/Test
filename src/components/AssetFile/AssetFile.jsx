import { defineComponent } from '@/casimir-framework/all';
import { VexImage } from '@/plugins/VuetifyExtended';
import { VImg } from 'vuetify/lib/components';

export default defineComponent({
  name: 'AssetFile',

  components: {
    // VexImage,
    VImg
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

    contentClass() {
      const { smAndDown } = this.$vuetify.breakpoint;
      return smAndDown ? "responsive-img-w-300px" : ""
    },
  },

  render() {
    // return <vex-image 
    //   height="400" 
    //   width="100%"
    //   content-class="responsive-image" 
    //   full-view 
    //   src={this.assetUrl} />;

    return <v-img
      height="400" 
      width="100%"
      content-class={this.contentClass}
      src={this.assetUrl} />;
  }
});
