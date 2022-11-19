<template>
  <v-navigation-drawer
    v-model="isOpen"
    v-bind="states"
  >
    <admin-navigation-menu
      :items="menu.admin"
    />
  </v-navigation-drawer>
</template>

<script>
  import { AdminNavigationMenu } from '@/modules/admin/components/view/AdminNavigationMenu';

  export default {
    name: 'AdminNavigation',
    components: { AdminNavigationMenu },
    data() {
      return {
        menu: {
          admin: [
            {
              icon: 'mdi-puzzle-outline',
              title: this.$t('components.navigation.attributes'),
              to: { name: 'admin.attributes' }
            },
            {
              icon: 'mdi-view-quilt-outline',
              title: this.$t('components.navigation.layouts'),
              to: { name: 'admin.layouts' }
            }
          ]
        }
      };
    },

    computed: {
      isOpen: {
        get() {
          return this.$store.getters['admin/sideBar'].isVisible;
        },
        set(value) {
          this.$store.dispatch('admin/changeSideBarState', {
            isVisible: value
          });
        }
      },

      states() {
        const {
          sm, md, smAndUp
        } = this.$vuetify.breakpoint;

        return {
          app: true,
          clipped: true,
          permanent: smAndUp && this.isOpen,
          expandOnHover: sm || md,
          miniVariant: sm || md
        };
      }
    }
  };
</script>
