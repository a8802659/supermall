module.exports = {
  configureWebpack: {
    resolve: {
      // extensions配置路径
      alias: {
        // '@':'src'已经配置过
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}