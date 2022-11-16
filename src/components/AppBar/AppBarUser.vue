<template>
  <ve-stack flow="column" gap="8">
    <m-btn
      v-if="isGuest"
      kind="secondary"
      small
      active-class="no-active"
      :to="{ name: 'signIn' }"
    >
      {{ $t('auth.signIn') }}
    </m-btn>

    <template v-if="isUser">
      <v-menu
        bottom
        left
        offset-y
        min-width="220"
      >
        <template #activator="{ on }">
          <m-btn
            kind="tetriary"
            small
            v-on="on"
          >
            {{ $t('components.appBar.profile') }}
          </m-btn>
        </template>

        <v-list dense active-class="primary">
          <v-list-item
            v-for="(item, index) of userMenu"
            :key="'nav-tab-' + index"
            :to="item.to"
          >
            <v-list-item-icon>
              <v-icon v-if="item.icon">
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.label }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item v-if="isModerator" :to="{ name: 'moderation' }">
            <v-list-item-icon>
              <v-icon>mdi-thumbs-up-down</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('components.appBar.moderation') }}</v-list-item-title>
          </v-list-item>

          <template v-if="isAdmin">
            <v-divider />
            <v-list-item :to="{ name: 'admin' }">
              <v-list-item-icon>
                <v-icon>mdi-account-tie</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ $t('components.appBar.admin') }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-divider />

          <v-list-item @click="handleSignOut">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('auth.signOut') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <m-btn
        kind="primary"
        :disabled="loading"
        small
        active-class="no-active"
        @click="handleCreateAssetClick"
      >
        {{ $t('components.appBar.submitAsset') }}
      </m-btn>

      <asset-create-dialog
        v-model="isCreateAssetDialogOpened"
      />

    </template>
  </ve-stack>
</template>

<script>
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { AssetCreateDialog } from '@/modules/marketplace/components/AssetCreateDialog';
  import { MBtn } from '../MBtn';

  export default {
    name: 'AppBarUser',

    components: {
      VeStack,
      MBtn,
      AssetCreateDialog,
    },

    data() {
      return {
        loading: false,
        isCreateAssetDialogOpened: false,
      };
    },

    computed: {
      userMenu() {
        return [
        ];
      },
      isGuest() {
        return false;
      },
      isUser() {
        return true;
      },
      isModerator() {
        return true;
      },
      isAdmin() {
        return true;
      }
    },

    created() {
    },

    methods: {

      handleSignOut() {
        this.$store.dispatch('auth/signOut');
      },

      handleCreateAssetClick() {
        this.isCreateAssetDialogOpened = true;
      },

    }
  };
</script>
