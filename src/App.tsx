import { useEffect } from 'react';
import './App.css';

const App = () => {
  useEffect(() => {
    console.log('NODE_ENV', process.env.NODE_ENV);
    console.log('PROXY_ENV', process.env.PROXY_ENV);
    console.log('process.env', process.env);
  }, []);

  return <h2>Hello East_White</h2>;
};

export default App;
