import { defineComponent } from '@/casimir-framework/all';
import { AttributeModelMixin, AttributeRootComponentMixinFactory } from '../mixins';

const AttributeSet = defineComponent({
  name: 'AttributeSet',

  mixins: [
    AttributeRootComponentMixinFactory('set'),
    AttributeModelMixin
  ]
});

export default AttributeSet;
export { AttributeSet };
