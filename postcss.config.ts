import { ConfigFn } from 'postcss-load-config';

const config: ConfigFn = ctx => {
  console.log('postcss环境', ctx.env);

  return {
    plugins: [require('autoprefixer')], //自动补全浏览器私有前缀
  };
};

export default config;
