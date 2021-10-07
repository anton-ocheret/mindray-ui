module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },
  devServer: {
    proxy: 'http://localhost:3001/',
  },
};
