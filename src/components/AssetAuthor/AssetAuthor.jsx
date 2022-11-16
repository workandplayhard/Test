import { defineComponent } from '@/casimir';

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
      const { authors } = this.schemaData.data;

      if (!authors || !authors.length) return null;

      const authorId = authors[0];
      const author = this.$store.getters['users/one'](authorId);

      if (!author?.attributes) return null;

      return this.$attributes
        .getMappedData('user.name', author.attributes)?.value;
    }
  },

  render() {
    return <span>{ this.authorName }</span>;
  }
});
