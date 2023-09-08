import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
import WebpackBar from 'webpackbar';

/*
 * 环境
 */
const envConfig = dotenv.config({
  path: path.resolve(__dirname, '../env/.env.' + process.env.PROXY_ENV),
});
console.log('NODE_ENV ', process.env.NODE_ENV);
console.log('PROXY_ENV', process.env.PROXY_ENV);
console.log('REACT_APP_API_URL', process.env.REACT_APP_API_URL);

const baseConfig: Configuration = {
  /*
   * 入口文件
   */
  entry: path.join(__dirname, '../src/index.tsx'),
  /*
   * 出口文件
   */
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:8].build.js',
    publicPath: process.env.NODE_ENV === 'development' ? '' : './', // 打包后文件的公共前缀路径
    clean: true,
  },

  /*
   * loader 配置
   */
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    // .js 的原因是因为 webpack-dev-server 源码用到了 require('xx.js')
    extensions: ['.tsx', '.ts', '.js'],
  },

  /*
   * plugins 的配置
   */
  plugins: [
    // 全局变量，可以在浏览器使用 process 变量
    new DefinePlugin({
      'process.env': JSON.stringify(envConfig.parsed),
      'process.env.PROXY_ENV': JSON.stringify(process.env.PROXY_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    // webpack 进度条
    new WebpackBar(),
    // 自动生成 html
    new HtmlWebpackPlugin({
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: path.join(__dirname, '../public/index.html'),
      title: 'webpack5-react-ts1',
    }),
  ],
};

export default baseConfig;
