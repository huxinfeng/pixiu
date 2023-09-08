declare module 'process' {
  global {
    namespace NodeJS {
      export interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        PROXY_ENV: 'development' | 'test' | 'preview' | 'production';
      }
    }
  }
}
