<template>
  <m-dialog
    v-model="isDialogOpen"
    persistent
    max-width="646"
    max-content-height="600"
  >
    <template #title>
      {{ $t('marketplace.createAsset.formTitle') }}
    </template>
    <asset-create-form
      ref="createAssetForm"
      class="d-block mt-1"
      @success="handleCreateSuccess"
    />
  </m-dialog>
</template>

<script>
  import { MDialog } from '@/components/MDialog';
  import AssetCreateForm from './AssetCreateForm';

  export default {
    name: 'AssetCreateDialog',
    components: {
      MDialog,
      AssetCreateForm
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        isDialogOpen: this.value
      };
    },

    watch: {
      value: {
        handler(newVal) {
          this.isDialogOpen = newVal;
        }
      },
      isDialogOpen: {
        handler(newVal) {
          this.$emit('input', newVal);
          if (!newVal) {
            this.$refs.createAssetForm.clearForm();
          }
        }
      }
    },

    methods: {
      handleCreateSuccess() {
        this.closeDialog();
      },
      closeDialog() {
        this.isDialogOpen = false;
      }
    }
  };
</script>
