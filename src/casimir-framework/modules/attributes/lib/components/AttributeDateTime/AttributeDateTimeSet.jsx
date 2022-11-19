import { VexDateTimeInput } from '@/plugins/VuetifyExtended';
import { defineComponent } from '@/casimir-framework/all';
import { AttributeSetMixin } from '../../mixins';

/**
 * Component for changing date time attribute
 */
export default defineComponent({
  name: 'AttributeDateTimeSet',

  mixins: [AttributeSetMixin],

  methods: {
    /**
     * Generate changing date time attribute
     *
     * @param {Array} errors
     */
    genAttribute(errors) {
      return (
        <VexDateTimeInput
          vModel={this.internalValue}
          label={this.attributeInfo.title}
          errorMessages={errors}
        />

      );
    }
  }
});
