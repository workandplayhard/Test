import { defineComponent } from '@/casimir';
import { dateMixin } from '@/casimir';

export default defineComponent({
  name: 'AssetCreatedAt',

  mixins: [dateMixin],

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    createdAtDate() {
      return this.schemaData.data.createdAt;
    }
  },

  render() {
    if (!this.createdAtDate) {
      return null;
    }

    return <span>{ this.$$formatDate(this.$$parseISO(this.createdAtDate), 'PP') }</span>;
  }
});
