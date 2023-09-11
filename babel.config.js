/** @type {import('@babel/core').ConfigFunction} */
module.exports = api => {
  api.cache.using(() => process.env['NODE_ENV']); // 根据 NODE_ENV 缓存配置

  const isDev = api.env('development');

  // 通常使用 browserslistrc，但对于 Jest，使用当前 Node 版本
  const isTest = api.env('test');
  const jestTargets = { targets: { node: 'current' } };
  /** @type {import('@babel/core').PluginItem} */
  let presetEnv = '@babel/preset-env';
  if (isTest) presetEnv = [presetEnv, jestTargets];

  return {
    // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
    presets: [
      // 如果使用的是 Babel 和 React 17，您可能需要将 "runtime": "automatic" 添加到配置中。
      // 否则可能会出现错误：Uncaught ReferenceError: React is not defined
      ['@babel/preset-react', { runtime: 'automatic' }],
      /* tsx 中支持 ts 语法 */
      '@babel/preset-typescript',
    ],
    plugins: [
      /* 装饰器支持 */
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      /*
       * 这是一个运行时工具，专门用于实现 React 组件的热刷新。它在运行时负责监视组件文件的更改，并在需要时执行组件的热刷新。它还负责保留组件的状态以及处理相关的错误
       * @pmmmwh/react-refresh-webpack-plugin 插件在 Webpack 构建中生成了特定的 HMR 更新代码，这些代码依赖于 react-refresh 运行时库
       */
      isDev && require.resolve('react-refresh/babel'),
    ].filter(Boolean), // 过滤空值,
  };
};
