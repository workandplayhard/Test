<template>
  <nft-collection-form
    ref="nftCollectionForm"
    :schema="$layouts.getMappedData('nftCollection.form').value"
    @success="handleSuccess"
    @error="handleError"
    @cancel="handleCancel"
  />
</template>

<script>
  import { NftCollectionForm } from '@casimir.one/nft-collections-module';

  export default {
    name: 'AssetCreateForm',

    components: {
      NftCollectionForm
    },

    data() {
      return {
        loading: false,
        title: null
      };
    },

    methods: {
      handleSuccess() {
        this.$notifier.showSuccess(this.$t('components.collectionCreateDialog.createSuccess'));
        this.reloadNftCollection();
        this.$emit('close-dialog');
      },
      handleError(error) {
        this.reloadNftCollection();
        if (error) this.$notifier.showError(error);
      },
      handleCancel() {
        this.$emit('close-dialog');
      },
      clearForm() {
        this.$refs.nftCollectionForm.clearForm();
      },
      async reloadNftCollection() {
        await this.$store.dispatch('getCurrentUserNftCollection');
      }
    }

  };
</script>
