import CompressionPlugin from 'compression-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import * as glob from 'glob';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { PurgeCSSPlugin } from 'purgecss-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.base';

const prodConfig: Configuration = merge(baseConfig, {
  /*
   * 生产模式，会开启 tree-shaking 和压缩代码，以及其他优化
   */
  mode: 'production',

  /*
   * 集成优化
   */
  optimization: {
    // 减少入口文件打包的体积，运行时代码会独立抽离成一个 runtime 的文件
    runtimeChunk: true,

    /* 代码分割 */
    splitChunks: {
      // 分隔代码
      cacheGroups: {
        // 提取 node_modules 代码
        vendors: {
          test: /node_modules/, // 只匹配 node_modules 里面的模块
          name: 'vendors', // 提取文件命名为 vendors,js 后缀和 chunkhash 会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于 0 就提取出来
          priority: 1, // 提取优先级为 1
        },
        // 提取页面公共代码
        commons: {
          name: 'commons', // 提取文件命名为 commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于 0 就提取出来
        },
      },
    },

    /* 代码压缩、删除 */
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'], // 删除 console.log
          },
        },
      }),
    ],
  },

  /*
   * plugins 的配置
   */
  plugins: [
    /* 静态资源拷贝 */
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制 public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到 dist 目录中
          filter: source => !source.includes('index.html'), // 忽略 index.html
        },
      ],
    }),

    /* 样式提取 */
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css', // 抽离 css 的输出目录和名称
    }),

    /*
     * 移除未使用的 css
     * 清理无用 css，检测 src 下所有 tsx 文件和 public下 index.html 中使用的类名和 id 和标签名称
     * 只打包这些文件中用到的样式
     */
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, {
        nodir: true,
      }),
      safelist: {
        standard: [/^ant-/], // 过滤以 ant- 开头的类名，哪怕没用到也不删除
      },
      blocklist: undefined,
      // 用 only 来指定 purgecss-webpack-plugin 的入口
      // https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin
      only: ['dist'],
    }),

    /* 打包时生成 gzip 文件 */
    new CompressionPlugin({
      test: /\.(js|css)$/, // 只生成 css,js 压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是 gzip
      threshold: 10 * 1024, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
    }),
  ],
});

export default prodConfig;
