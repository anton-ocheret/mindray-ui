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
    proxy: process.env.VUE_APP_API_URL,
  },
};
