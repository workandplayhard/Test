// const env = (process.env.DEIP_CONFIG || process.env.NODE_ENV === 'local')
//   ? 'local'
//   : process.env.NODE_ENV || 'development';

const env = "local";

// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config({
  path: `${__dirname}/${
    // eslint-disable-next-line no-nested-ternary
    env === "production"
      ? ".prod.env"
      : env === "development"
      ? ".dev.env"
      : process.env.DEIP_CONFIG
      ? `.${process.env.DEIP_CONFIG}.env`
      : ".local.env"
  }`,
});

const config = {
  NODE_ENV: process.env.NODE_ENV,

  DEIP_SERVER_URL: process.env.DEIP_SERVER_URL,
  DEIP_WEB_SOCKET_URL: process.env.DEIP_WEB_SOCKET_URL,
  DEIP_WEB_SOCKET_TIMEOUT: process.env.DEIP_WEB_SOCKET_TIMEOUT
    ? parseInt(process.env.DEIP_WEB_SOCKET_TIMEOUT)
    : 0,
  DEIP_FULL_NODE_URL: process.env.DEIP_FULL_NODE_URL,
  DEIP_CHAIN_EXPLORER_URL: process.env.DEIP_CHAIN_EXPLORER_URL,
  TENANT: process.env.TENANT,
  TENANT_HOT_WALLET_DAO_ID: process.env.TENANT_HOT_WALLET_DAO_ID,
  CHAIN_ID: process.env.CHAIN_ID,
  PROTOCOL: process.env.PROTOCOL ? parseInt(process.env.PROTOCOL) : 0,
  CORE_ASSET: JSON.parse(process.env.CORE_ASSET),
  FAUCET_ACCOUNT_USERNAME: process.env.FAUCET_ACCOUNT_USERNAME,

  SIG_SEED: process.env.SIG_SEED,

  APP_ID: process.env.APP_ID,

  VUE_APP_I18N_LOCALE: process.env.VUE_APP_I18N_LOCALE,
  VUE_APP_I18N_FALLBACK_LOCALE: process.env.VUE_APP_I18N_FALLBACK_LOCALE,

  WALLET_URL: process.env.WALLET_URL,
};

module.exports = config;
