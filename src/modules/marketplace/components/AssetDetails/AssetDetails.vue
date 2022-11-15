<template>
  <m-dialog
    v-if="asset"
    v-model="isDialogOpen"
    persistent
    :max-width="maxWidth"
    max-content-height="600"
  >
    <div>ASSET DETAILS: {{asset.name}}</div>
    <template v-if="!completeCheckout" #aside>
      <!-- <vex-image -->
      <v-img
        height="500"
        :min-width="minImageWidth"
        content-class="responsive-image"
        full-view
        :src="assetUrl"
      />
    </template>
    <template #title>
      <div>
        <m-btn
          v-if="completeCheckout"
          kind="tetriary"
          small
          @click="handleBackClick"
        >
          <v-icon
            left
            dark
          >
            mdi-chevron-left
          </v-icon>
          {{ $t('marketplace.assetDetails.backButton') }}
        </m-btn>
      </div>
    </template>
    <template v-if="isApprovedAsset && !completeCheckout" #titleButtons>
      <m-btn
        small
        icon
        kind="secondary"
        @click="handleCopyLinkClick"
      >
        <v-icon>mdi-share-variant</v-icon>
      </m-btn>
    </template>
    <div v-if="!completeCheckout">
      <layout-renderer
        :value="asset"
        :schema="detailsSchema"
        :schema-data="detailsSchemaData"
      />
      <div
        v-if="isBuyShown"
        class="d-flex justify-end"
      >
        <m-btn
          kind="primary"
          @click="handleBuyClick"
        >
          {{ $t('marketplace.assetDetails.buy') }}
        </m-btn>
      </div>
    </div>
  </m-dialog>
</template>

<script>
  // import { dateMixin } from '@casimir.one/platform-components';
  import { dateMixin } from './../../../../casimir';
  // import { userHelpersMixin } from '@casimir.one/users-module';
  // import { VexImage } from '@casimir.one/vuetify-extended';
  // import { NftItemMetadataDraftStatus } from '@casimir.one/platform-core';
  // import { attributeMethodsFactory, expandAttributes } from '@casimir.one/attributes-module';
  // import { attributedDetailsFactory, LayoutRenderer } from '@casimir.one/layouts-module';

  import { MDialog, MBtn } from '@/components';

  export default {
    name: 'AssetDetails',

    components: {
      MDialog,
      MBtn,
      // VexImage,
      // LayoutRenderer
    },

    mixins: [dateMixin, /* userHelpersMixin, attributedDetailsFactory('nftItem') */],

    props: {
      value: {
        type: Boolean,
        default: true
      },
      id: {
        type: [Object, String],
        required: true
      },
      mainRoute: {
        type: Object,
        default: null
      },
      isDraft: {
        type: Boolean,
        default: false
      }

    },

    data() {
      return {
        completeCheckout: false,
        showBackButton: false
      };
    },

    computed: {
      // detailsSchema() {
      //   return this.$layouts.getMappedData('nftItem.details').value;
      // },

      // detailsSchemaData() {
      //   const scopeId = !this.isDraft ? this.asset._id : {
      //     nftItemId: this.asset.nftItemId,
      //     nftCollectionId: this.asset.nftCollectionId
      //   };
      //   return {
      //     ...attributeMethodsFactory(
      //       expandAttributes(this.asset),
      //       {
      //         scopeName: 'nftItem',
      //         scopeId
      //       }
      //     ),
      //     ...this.schemaData
      //   };
      // },

      asset() {
        // return (this.isDraft)
        //   ? this.$store.getters['nftItemDrafts/one'](this.id)
        //   : this.$store.getters['nftItems/one'](this.id);

        return {"name": "Asset number one"};
      },

      assetUrl() {
        return "http://something";
        // const image = this.$attributes.getMappedData(
        //   'nftItem.image',
        //   this.asset.attributes
        // );

        // if (!image) return null;

        // const scopeId = JSON.stringify({
        //   nftCollectionId: this.asset.nftCollectionId,
        //   nftItemId: this.asset.nftItemId
        // });

        // return this.$attributes.getFileSrc({
        //   scope: 'nftItem',
        //   scopeId,
        //   attributeId: image.attributeId,
        //   filename: image.value
        // });
      },

      creator() {
        // const userData = this.$store.getters['users/one'](this.asset.authors[0]);
        // if (!userData?.attributes) return null;
        // return this.$attributes
        //   .getMappedData('user.name', userData.attributes)?.value;
        return "creator";
      },

      isCurrentUserAuthor() {
        // return this.asset.authors.includes(this.$currentUser._id);
        return false;
      },

      maxWidth() {
        return this.completeCheckout ? '638' : '1100';
      },

      minImageWidth() {
        return this.$vuetify.breakpoint.xs ? null : '500';
      },

      isDialogOpen: {
        get() {
          return this.value;
        },
        set(value) {
          this.$emit('input', value);
          if (!value) {
            this.closeDialog();
          }
        }
      },

      isApprovedAsset() {
        return false; //this.isDraft && this.asset.status === NftItemMetadataDraftStatus.APPROVED;
      },

      isBuyShown() {
        return false;
      }
    },

    created() {
      this.getData();
    },

    methods: {
      closeDialog() {
        if (!this.mainRoute) {
          this.$emit('close');
        } else {
          this.$router.push(this.mainRoute);
        }
      },

      async getData() {
        // try {
        //   if (this.isDraft) {
        //     await this.$store.dispatch('nftItemDrafts/getOne', this.id);
        //   } else {
        //     await this.$store.dispatch('nftItems/getOne', this.id);
        //   }
        //   if (this.asset) {
        //     await this.$store.dispatch('users/getOne', this.asset.authors[0]);
        //     await this.$store.dispatch('nftCollections/getOne', this.asset.nftCollectionId);
        //   }
        // } catch (error) {
        //   console.error(error);
        // }
      },

      handleCopyLinkClick() {
        // const props = this.$router.resolve({
        //   name: 'assetDetails',
        //   params: { id: this.asset._id }
        // });

        // navigator.clipboard.writeText(`${window.location.origin}/${props.href}`);
        // this.$notifier.showSuccess(this.$t('components.assetCard.linkCopied'));
      },

      handleBuyClick() {
        this.completeCheckout = true;
      },

      handleBackClick() {
        this.completeCheckout = false;
      }
    }
  };
</script>

<style  lang="scss">
  .responsive-image {
    width: 100% !important;
  }
</style>
