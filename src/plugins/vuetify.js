import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { VTextField, VBtn } from 'vuetify/lib/components';

VTextField.extendOptions.props.outlined.default = true;
VBtn.extendOptions.props.depressed.default = true;

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: {
          base: '#000000',
          hover: '#393939'
        },
        success: '#3ACC6C',
        info: '#5BC3F9',
        warning: '#C74031',
        neutral: '#F7F7F7',
        anchor: '#0052C8',
        background: '#F7F7F7',
        grey: {
          lighten4: '#E6E6E6',
          lighten3: '#C9C9C9',
          lighten2: '#ACACAC',
          lighten1: '#8F8F8F',
          base: '#737373',
          darken1: '#565656',
          darken2: '#393939',
          darken3: '#1D1D1D',
          darken4: '#000000'
        }
      }
    }
  }
});
