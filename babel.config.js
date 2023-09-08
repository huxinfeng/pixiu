/** @type {import('@babel/core').ConfigFunction} */
module.exports = api => {
  api.cache.using(() => process.env['NODE_ENV']); // 根据 NODE_ENV 缓存配置

  // 通常使用 browserslistrc，但对于 Jest，使用当前 Node 版本
  const isTest = api.env('test');
  const jestTargets = { targets: { node: 'current' } };
  /** @type {import('@babel/core').PluginItem} */
  let presetEnv = '@babel/preset-env';
  if (isTest) presetEnv = [presetEnv, jestTargets];

  return {
    presets: [
      // 如果使用的是 Babel 和 React 17，您可能需要将 "runtime": "automatic" 添加到配置中。
      // 否则可能会出现错误：Uncaught ReferenceError: React is not defined
      ['@babel/preset-react', { runtime: 'automatic' }],
    ],
  };
};
