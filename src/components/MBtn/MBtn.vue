<template>
  <v-btn v-bind="buttonProps" v-on="$listeners">
    <template #loader>
      <slot name="loader" />
    </template>
    <slot />
  </v-btn>
</template>

<script>
  import { VBtn } from 'vuetify/lib/components';
  import { getBindableProps } from '@/plugins/VuetifyExtended';

  const BUTTON_KIND = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TETRIARY: 'tetriary'
  };

  export default {
    name: 'MBtn',

    props: {
      ...VBtn.options.props,
      /**
       * Kind of button
       * @example primary, secondary, tetriary
       */
      kind: {
        type: String,
        default: BUTTON_KIND.PRIMARY,
        validator(value) { return Object.values(BUTTON_KIND).includes(value); }
      }
    },

    computed: {
      buttonProps() {
        return {
          ...this.buttonPropsByKind,
          ...getBindableProps.call(this, VBtn.options.props)
        };
      },

      buttonPropsByKind() {
        if (this.kind === BUTTON_KIND.PRIMARY) {
          return {
            color: 'primary'
          };
        }

        if (this.kind === BUTTON_KIND.SECONDARY) {
          return {
            outlined: true,
            text: true
          };
        }

        if (this.kind === BUTTON_KIND.TETRIARY) {
          return {
            text: true
          };
        }

        return null;
      }
    }
  };
</script>
