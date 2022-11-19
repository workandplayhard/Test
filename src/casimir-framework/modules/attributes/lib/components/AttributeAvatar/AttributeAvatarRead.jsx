import { VexAvatar } from '@/plugins/VuetifyExtended';
import { defineComponent } from '@/casimir-framework/all';
import { AttributeReadMixin } from '../../mixins';

/**
 * Component for read only attribute avatar
 */
export default defineComponent({
  name: 'AttributeAvatarRead',

  mixins: [AttributeReadMixin],

  methods: {
    /**
     * Generate attribute avatar for read only
     */
    genAttribute() {
      return (
        <VexAvatar
          src={this.schemaData.getAttributeFileSrc(this.attributeId)}
          { ...{ props: this.proxyProps.VexAvatar || {} }}
        />
      );
    }
  },

  render() {
    return this.genAttribute();
  }
});
