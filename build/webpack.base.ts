import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
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
// 是否是开发模式
const isDev = process.env.NODE_ENV === 'development';

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
    filename: 'static/js/[name].[chunkhash:8].js',
    publicPath: process.env.NODE_ENV === 'development' ? '' : './', // 打包后文件的公共前缀路径
    clean: true,
  },

  /*
   * 持久化存储缓存
   * 通过开启 webpack5 持久化存储缓存，极大缩短了启动和打包的时间
   * 缓存的存储位置在 node_modules/.cache/webpack，里面又区分了 development 和 production 缓存
   */
  cache: {
    type: 'filesystem', // 使用文件缓存
  },

  /*
   * loader 配置
   */
  module: {
    rules: [
      /* 匹配 tsx ts */
      {
        test: /.ts(x)?$/,
        use: [
          /*
           * 多线程 thread-loader
           * 使用时,需将此 loader 放置在其他 loader 之前。放置在此 loader 之后的 loader 会在一个独立的 worker 池中运行
           * thread-loader 不支持抽离 css插件 MiniCssExtractPlugin.loader
           */
          'thread-loader',
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      /* 匹配 css 预处理器 */
      {
        test: /\.(s[a|c]ss)$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, // 开发环境使用 style-looader ,打包模式抽离 css
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:5]',
              },
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
        exclude: /node_modules/,
      },
      /* 匹配图片文件 */
      {
        test: /\.(png|jpe?g|webp|bmp|svg|gif)$/i,
        type: 'asset', // type 选择 asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb 转 base64
          },
        },
        generator: {
          filename: 'static/image/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      /* 匹配视频文件 */
      {
        test: /.(mp4|webm)$/,
        type: 'asset', // type 选择 asset
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 1024, // 小于 1M 转 base64
          },
        },
        generator: {
          filename: 'static/video/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      /* 匹配音频文件 */
      {
        test: /.(mp3|ogg|wav|flac|aac)$/,
        type: 'asset', // type 选择 asset
        parser: {
          dataUrlCondition: {
            maxSize: 1024 * 1024, // 小于 1M 转 base64
          },
        },
        generator: {
          filename: 'static/audio/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      /* 匹配字体图标文件 */
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: 'asset', // type 选择 asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于 10kb 转 base64
          },
        },
        generator: {
          filename: 'static/font/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      /* 匹配 json 文件 */
      // {
      //   test: /\.json$/,
      //   type: 'asset/resource',
      //   generator: {
      //     filename: 'static/json/[name].[hash][ext][query]', // 这里专门针对 json 文件的处理
      //   },
      // },
    ],
  },
  resolve: {
    // .js 的原因是因为 webpack-dev-server 源码用到了 require('xx.js')
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    // 别名需要配置两个地方，这里和 tsconfig.json
    alias: {
      '@': path.join(__dirname, '../src'),
    },
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
