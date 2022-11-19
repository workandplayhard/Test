import { defineComponent } from '@/casimir-framework/all';

export default defineComponent({
  name: 'AssetAuthor',

  props: {
    schemaData: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    authorName() {
      const { attributes } = this.schemaData.data;
      const arr = Object.keys(attributes).reduce((arr, key) => {
        return [...arr, { attributeId: key, value: attributes[key] }];
      }, []);
      const name = this.$attributes.getMappedData('nftItem.name', arr)?.value;
      return name;
    }
  },

  render() {
    return <span>{ this.authorName }</span>;
  }
});
