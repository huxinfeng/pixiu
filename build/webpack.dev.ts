import path from 'path';
import { Configuration } from 'webpack';
import { Configuration as ConfigurationDevServer } from 'webpack-dev-server';
import { merge } from 'webpack-merge';

import baseConfig from './webpack.base';

const devConfig: Configuration & ConfigurationDevServer = merge(baseConfig, {
  /*
   * 开发模式，打包更加快速，省了代码优化步骤
   */
  mode: 'development',

  /*
   * 开发环境推荐：eval-cheap-module-source-map
   * 本地开发首次打包慢点没关系，因为 eval 缓存的原因，热更新会很快
   * 开发中，我们每行代码不会写的太长，只需要定位到行就行，所以加上 cheap
   * 我们希望能够找到源代码的错误，而不是打包后的，所以需要加上 module
   */
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    compress: false, // gzip 压缩,开发环境不开启，提升热更新速度
    hot: true, // 开启热更新，如果资源不支持 HMR 会 fallback 到 live reloading
    historyApiFallback: true, // 解决 history 路由404问题
    setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    static: {
      directory: path.join(__dirname, '../public'), // 托管静态资源 public 文件夹
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
});

export default devConfig;
