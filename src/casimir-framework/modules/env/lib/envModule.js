import axios from 'axios';
import { proxydi } from '@/casimir-framework/proxydi';
import Clipboard from 'v-clipboard';
import { assert } from '@/casimir-framework/all';

const moduleName = 'EnvModule';

const init = async () => {
  const { data: env } = await axios.get('/env');
  proxydi.register('env', env);
  window.env = env;

  return env;
};

const install = (Vue, options, envData) => {
  if (install.installed) return;
  install.installed = true;

  const {
    store,
    router,
    vuetify,
    i18n
  } = options;

  // for unusual external cases
  proxydi.batchRegister({
    store,
    router,
    vuetify,
    i18n
  });

  Vue.prototype.$env = envData;
  Vue.$env = envData;

  assert(!!i18n, `[${moduleName}]: i18n instance is not provided`);

  const {
    VUE_APP_I18N_LOCALE: locale,
    VUE_APP_I18N_FALLBACK_LOCALE: fallbackLocale
  } = envData;

  if (locale) i18n.locale = locale;
  if (fallbackLocale) i18n.fallbackLocale = fallbackLocale;

  Vue.use(Clipboard);
};

export const EnvModule = {
  name: moduleName,
  deps: [],
  init,
  install
};
