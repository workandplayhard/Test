const path = require('path');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,

  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  },

  chainWebpack: (config) => {
    for (const module of ['vue', 'vuex', 'vue-router', 'vuetify']) {
      config.resolve.alias.set(module, path.join(__dirname, 'node_modules', module));
    }

    // https://polkadot.js.org/docs/usage/FAQ/#on-webpack-4-i-have-a-parse-error-on-importmetaurl
    config.module
      .rule('import-meta')
      .test(/\.js$/)
      .use('@open-wc/webpack-import-meta-loader')
      .loader('@open-wc/webpack-import-meta-loader');

    ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
      config.module
        .rule('sass')
        .oneOf(match)
        .use('sass-loader')
        .tap((opt) => ({
          ...opt,
          ...{
            additionalData(content, loaderContext) {
              const { resourcePath } = loaderContext;

              if (resourcePath.includes('vuetify') && resourcePath.includes('node_modules')) {
                return `@import "~@/styles/_vuetify-variables.scss"\n${content}`;
              }

              return content;
            }
          }
        }));
    });
  },

  devServer: {
    setup(app) {
      app.get('/env', (req, res) => {
        // eslint-disable-next-line global-require,import/no-dynamic-require
        res.json(require(path.join(__dirname, 'config', 'env.js')));
      });
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  transpileDependencies: [
    // '@casimir.one/*',
    // '@deip/*',
    'vuetify',
    '@polkadot/*'
  ],

  runtimeCompiler: true,
  parallel: false
};
