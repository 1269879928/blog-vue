const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = /\.(js|css)(\?.*)?$/i
module.exports = {
  productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions, // 匹配文件名
        threshold: 10240, // 对10K以上的数据进行压缩
        minRatio: 0.99,
        deleteOriginalAssets: false // 是否删除源文件
      })
    ]
  },
  css: {
    // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
    // 也可以是传递给 extract-text-webpack-plugin 的选项对象
    extract: true, // 允许生成 CSS source maps?
    sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
    modules: false,
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }

}
