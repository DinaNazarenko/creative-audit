import { defineConfig } from '@vue/cli-service'

export default defineConfig({
  transpileDependencies: ['v-tooltip'],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  publicPath: '/',
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0]['process.env'] = {
        ...args[0]['process.env'],
        VUE_APP_API_URL: 'http://localhost:4000',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_BUNDLE_ANALYZER__: false,
        __VUE_PROD_BUNDLE_SPLIT__: false,
        __VUE_PROD_BUNDLE_COMPRESS__: false,
      }
      return args
    })
  },
})
