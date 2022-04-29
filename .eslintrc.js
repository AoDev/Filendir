module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },

  plugins: ['standard', 'import'],

  extends: ['eslint-config-standard', 'plugin:prettier/recommended'],
}
