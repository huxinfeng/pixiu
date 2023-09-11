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

/* CSS MODULES */
declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

/* IMAGES */
declare module '*.png' {
  const ref: string;
  export default ref;
}
declare module '*.jpg' {
  const ref: string;
  export default ref;
}
declare module '*.jpeg' {
  const ref: string;
  export default ref;
}
declare module '*.webp' {
  const ref: string;
  export default ref;
}
declare module '*.bmp' {
  const ref: string;
  export default ref;
}
declare module '*.svg' {
  const ref: string;
  export default ref;
}
declare module '*.gif' {
  const ref: string;
  export default ref;
}

/* VIDEO */
declare module '*.mp4' {
  const ref: string;
  export default ref;
}
declare module '*.webm' {
  const ref: string;
  export default ref;
}

/* AUDIO */
declare module '*.mp3' {
  const ref: string;
  export default ref;
}
declare module '*.ogg' {
  const ref: string;
  export default ref;
}
declare module '*.wav' {
  const ref: string;
  export default ref;
}
declare module '*.flac' {
  const ref: string;
  export default ref;
}
declare module '*.aac' {
  const ref: string;
  export default ref;
}
