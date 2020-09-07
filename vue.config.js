module.exports = {
  chainWebpack: (config) => config.optimization.minimize(false),
  css: {
    loaderOptions: {
      less: {
        prependData: "@import '~@/styles/styles.less';",
      },
    },
  },
};
