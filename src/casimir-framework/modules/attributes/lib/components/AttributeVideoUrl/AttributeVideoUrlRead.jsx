import { VexVideoEmbed } from '@/plugins/VuetifyExtended';
import { defineComponent } from '@/casimir-framework/all';
import { AttributeReadMixin } from '../../mixins';

/**
 * Component for read only video url attribute
 */
export default defineComponent({
  name: 'AttributeVideoUrlRead',

  mixins: [AttributeReadMixin],

  methods: {
    /**
     * Generate read only video url attribute
     */
    genAttribute() {
      return (
        <VexVideoEmbed src={this.internalValue} />
      );
    }
  }
});
