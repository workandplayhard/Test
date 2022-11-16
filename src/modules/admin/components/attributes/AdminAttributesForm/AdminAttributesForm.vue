<template>
  <v-sheet>
    <v-btn
      class="mt-2 ml-2"
      icon
      style="pointer-events: all"
      @click="$router.back()"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>

    <vex-section max-width="800" class="mx-auto pa-0">
      <ve-stack :gap="32">
        <vex-section-title :title="title" />

        <attribute-edit
          v-if="ready"
          :mode="mode"
          :value="attributeData"
          @success="onSuccess"
          @error="onError"
        />
      </ve-stack>
    </vex-section>
  </v-sheet>
</template>

<script>
  import { AttributeEdit } from '@/casimir-framework/modules/attributes';
  import { VexSection, VexSectionTitle } from '@/plugins/VuetifyExtended';
  import { VeStack } from '@/casimir-framework/vue-elements';
  import { ViewMode } from '@/casimir-framework/vars';

  export default {
    name: 'AdminAttributesForm',
    components: {
      AttributeEdit,
      VeStack,
      VexSection,
      VexSectionTitle
    },

    props: {
      attributeId: {
        type: String,
        default: null
      },

      mode: {
        type: Number,
        default: ViewMode.CREATE,
        validator(value) {
          return [ViewMode.CREATE, ViewMode.EDIT].includes(value);
        }
      },

      title: {
        type: String,
        default: 'Create attribute'
      }
    },

    data() {
      return {
        ready: false
      };
    },

    computed: {
      attributeData() {
        return this.attributeId ? this.$store.getters['attributes/one'](this.attributeId) : null;
      }
    },

    created() {
      if (this.attributeId) {
        this.$store.dispatch('attributes/getOne', this.attributeId)
          .then(() => {
            this.ready = true;
          });
      } else {
        this.ready = true;
      }
    },

    methods: {
      onSuccess() {
        this.$notifier.showSuccess(this.$t('admin.attributes.attribute.saveSuccess'));
        this.$router.push({ name: 'admin.attributes' });
      },

      onError(error) {
        this.$notifier.showError(error);
      }
    }
  };
</script>
