import { Suspense, lazy, useEffect } from 'react';

import scssStyles from '@/app.scss';
import ogg from './assets/audio/Battle_1.ogg';
import bigImg from './assets/image/10kb_img.png';
import smallImg from './assets/image/5kb_img.jpeg';
import mp4 from './assets/video/Epic Games Launcher 2023-08-28 21-46-13.mp4';
import Class from './components/Class';
import Demo2 from './components/Demo2';
import a from './test';
import memberList from './test.json';
import h6 from './test.scss';
const LazyDemo = lazy(
  () =>
    /*
     * rel的属性值
     * preload是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源。
     * prefetch是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源，会在空闲时加载。
     *
     */
    import(
      /* webpackChunkName: "PreloadDemo" */
      /* webpackPreload: true */
      './components/LazyDemo'
    ),
);

const App = () => {
  useEffect(() => {
    // 啊啊啊啊
    console.log('NODE_ENV', process.env.NODE_ENV);
    console.log('PROXY_ENV', process.env.PROXY_ENV);
    console.log('process.env', process.env);

    console.log(memberList);
    console.log(a());
    console.log(h6);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <LazyDemo />
      </Suspense>
      <h2>Hello East_White</h2>
      <div className={scssStyles['scssBox']}>
        <div className={scssStyles['box']}>scssBox</div>
        <img
          src={smallImg}
          alt="小于10kb的图片"
        />
        <img
          src={bigImg}
          alt="大于于10kb的图片"
        />
        <div className={scssStyles['smallImg']}>小图片背景</div>
        <div className={scssStyles['bigImg']}>大图片背景</div>

        <video src={mp4}></video>
        <audio src={ogg}></audio>

        <Class />

        <Demo2 />
      </div>
    </>
  );
};

export default App;
