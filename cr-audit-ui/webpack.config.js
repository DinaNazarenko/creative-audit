import path from 'path'
import autoprefixer from 'autoprefixer'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { defineConfig } from '@vue/cli-service'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(new URL('', import.meta.url))
const __dirname = path.dirname(__filename)

export default defineConfig({
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
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
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [autoprefixer],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
})
