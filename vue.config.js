const path = require('path');

module.exports = {
  transpileDependencies: ['vuetify'],
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_NAME; // eslint-disable-line no-param-reassign
      return args;
    });
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('@modules', path.resolve(__dirname, 'src/modules'))
      .set('@plugins', path.resolve(__dirname, 'src/plugins'));
  },
};
