<template>
  <validation-observer
    v-slot="{ invalid, handleSubmit }"
    ref="validationObserver"
  >
    <v-form
      :disabled="loading"
      @submit.prevent="handleSubmit(submit)"
    >
      <ve-stack>
        CREATE ASSET FORM
        <layout-renderer
          v-if="formSchema"
          :key="forceUpdateKey"
          v-model="formData"
          :schema="formSchema"
          :schema-data="schemaData"
        />

        <validation-provider
          v-slot="{ errors }"
          :name="$t('marketplace.createAsset.moderation')"
          :rules="{ required: { allowFalse: false } }"
          :custom-messages="{ required: $t('marketplace.createAsset.moderationRequired') }"
        >
          <v-checkbox
            v-model="isModerationChecked"
            :label="$t('marketplace.createAsset.moderationMessage')"
            :error-messages="errors"
            hide-details="auto"
            class="pa-0 mt-0"
          />
        </validation-provider>

        <div class="buttons-container ml-auto">
          <m-btn
            kind="primary"
            :disabled="invalid"
            :loading="loading"
            type="submit"
          >
            {{ $t('marketplace.createAsset.createNft') }}
          </m-btn>
        </div>
      </ve-stack>
    </v-form>
  </validation-observer>
</template>

<script>
  import { attributedFormFactory, LayoutRenderer } from '@/casimir-framework/modules/layouts';
  import { NftItemMetadataDraftStatus, AttributeScope } from '@/casimir-framework/vars';
  import { MBtn } from '@/components/MBtn';
  import { VeStack } from '@/casimir-framework/vue-elements';

  export default {
    name: 'AssetCreateForm',

    components: {
      LayoutRenderer,
      VeStack,
      MBtn
    },

    mixins: [attributedFormFactory(AttributeScope.NFT_ITEM, 'nftItem')],

    data() {
      return {
        loading: false,
        isModerationChecked: false
      };
    },

    computed: {
      formSchema() {
        return this.$layouts.getMappedData('nftItem.form')?.value;
      },

      nftCollection() {
        return {} //this.$store.getters.userNftCollection;
      },
    },

    mounted() {
      this.clearForm();
      // this.reloadNftCollection();
    },

    methods: {
      // async reloadNftCollection() {
      //   await this.$store.dispatch('getCurrentUserNftCollection');
      // },

      async submit() {
        this.loading = true;
        await this.createAsset();
        this.loading = false;
      },

      clearForm() {
        this.restoreOldValue(true);

        this.isModerationChecked = false;
        this.$refs.validationObserver.reset();
      },

      async sellLazy() {
        const { _id, issuer, nextNftItemId } = this.nftCollection;
        const asset = this.$attributes
          .getMappedData('nftItem.price', this.lazyFormData.attributes)?.value;

        const payload = {
          initiator: this.$currentUser,
          data: {
            issuer,
            asset,
            nftCollectionId: _id,
            nftItemId: nextNftItemId
          }
        };

        await this.$store.dispatch('nftItemDrafts/sellLazy', payload);
      },

      async createAsset() {
        if (!this.nftCollection) {
          this.$notifier.showError(this.$t('marketplace.createAsset.errors.noNftCollection'));
          return;
        }

        let createdAssetId;
        try {
          const draftPayload = {
            data: {
              owner: this.$currentUser._id,
              ownedByTeam: false,
              nftCollectionId: this.nftCollection._id,
              nftItemId: this.nftCollection.nextNftItemId,
              authors: [this.$currentUser._id],
              status: NftItemMetadataDraftStatus.IN_PROGRESS,
              ...this.lazyFormData
            }
          };

          const {
            data:
              { _id }
          } = await this.$store.dispatch('nftItemDrafts/create', draftPayload);
          createdAssetId = _id;

          await this.sellLazy();

          const {
            nftItemMetadataDraftModerationRequired = false
          } = this.$currentPortal?.profile?.settings?.moderation || {};
          const status = nftItemMetadataDraftModerationRequired
            ? NftItemMetadataDraftStatus.PROPOSED
            : NftItemMetadataDraftStatus.APPROVED;

          const changeStatusPayload = {
            data: {
              _id: createdAssetId,
              status
            }
          };

          await this.$store.dispatch('nftItemDrafts/moderate', changeStatusPayload);

          // this.reloadNftCollection();

          this.$notifier.showSuccess(this.$t('marketplace.createAsset.createSuccess'));
          this.$emit('success');
          this.$eventBus.$emit('submit-asset');
          this.clearForm();
        } catch (error) {
          if (createdAssetId) {
            this.$store.dispatch('nftItemDrafts/remove', createdAssetId);
          }
          if (error && error?.message !== 'close'
            && error?.error?.message !== 'close') {
            console.error(error.error || error);
            const errorText = error.statusCode === 409
              ? this.$t('marketplace.createAsset.errors.duplicate') : error;
            this.$notifier.showError(errorText);
          }
        }
      }
    }
  };
</script>
