module.exports = {
  root: true,
  extends: [
    // '@casimir.one/eslint-config',
    // '@casimir.one/eslint-config/vue'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.vue']
      }
    }
  }
};
