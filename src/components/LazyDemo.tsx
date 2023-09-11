import { useEffect } from 'react';

const LazyDemo = () => {
  useEffect(() => {
    console.log(1);
    const a = [];
    a.push(1);
    new Promise(resove => {
      setTimeout(() => {
        resove(121212311);
      }, 2000);
    }).then(() => {
      alert(1);
    });
  });
  return <h3>我是懒加载组件组件</h3>;
};

export default LazyDemo;
