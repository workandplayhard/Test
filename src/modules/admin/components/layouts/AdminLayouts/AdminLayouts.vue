<template>
  <layouts-management
    @click-remove="onClickRemove"
    @click-edit="onClickEdit"
    @click-create="onClickCreate"
    @click-settings="onClickSettings"
  />
</template>

<script>
  import { LayoutsManagement } from '@casimir.one/layouts-module';

  export default {
    name: 'AdminLayouts',

    components: {
      LayoutsManagement
    },

    methods: {
      onClickRemove(item) {
        this.$confirm(this.$t('admin.layouts.layout.remove'),
                      { title: this.$t('admin.layouts.layout.removeTitle') })
          .then((confirm) => {
            if (confirm) {
              this.$store.dispatch('layouts/remove', item)
                .then(() => {
                  this.$notifier.showSuccess(this.$t('admin.layouts.layout.removeSuccess'));
                })
                .catch((err) => {
                  console.error(err);
                  this.$notifier.showError(this.$t('admin.layouts.layout.removeError'));
                });
            }
          });
      },

      onClickEdit({ _id }) {
        this.$router.push({
          name: 'admin.layouts.edit',
          params: {
            layoutId: _id
          }
        });
      },

      onClickCreate() {
        this.$router.push({
          name: 'admin.layouts.create'
        });
      },

      onClickSettings() {
        this.$router.push({
          name: 'admin.layouts.settings'
        });
      }
    }
  };
</script>
