import './App.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useState, useEffect } from 'react';
import {Child} from './Child';
import { TransformSync, TransformAsync } from './Transform';
import Clicker from './Clicker';

import worker from './Transform.worker.js';
import WebWorker from './WebWorker';

function App({n}) {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [useAsync, setAsync] = useState(false);
  const [useWorker, setUserWorker] = useState(false);

  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    if (reloadCount === 0) {
      console.log('count = 0');
      return;
    }
    if (isLoading) {
      console.log('already loading');
      return;
    }

    setLoading(true);
    console.log('fetching data...');

    setTimeout(async () => {
      const startTime = performance.now();
      let data = []

      const postData = (data) => {
        const endTime = performance.now();
        data.push(Math.trunc(endTime-startTime)+' ms');
        setLoading(false);
        setData(data);
        console.log('data fetched');
      }

      if (useWorker) {
        const webWorker = new WebWorker(worker);
        const handleMessage = (event) => {
          console.log('Received result from worker:', event);
          postData(data);
          webWorker.removeEventListener('message', handleMessage);
          webWorker.terminate();
        }
        webWorker.addEventListener('message', handleMessage);
        webWorker.postMessage({ n });
      } else if (useAsync) {
        data = await TransformAsync(n)
        postData(data);
      } else {
        data = await TransformSync(n)
        postData(data);
      }


    }, 300);
  }, [reloadCount]);

  const toggleAsyncSync = () => {
    setAsync(!useAsync);
  };

  const toggleUseWorker = () => {
    setUserWorker(!useWorker);
  }

  const updateCount = () => {
    setReloadCount(reloadCount + 1);
  }

  return (
    <div className="App">
      <header className="App-header">
        {isLoading && <ProgressSpinner />}

        {!isLoading && data.map((item, index) => (
          <Child key={index} value={item} />
        ))}

        <div style={{marginTop: '2rem'}}>
          <Clicker /> 
        </div>

        <div style={{marginTop: '2rem'}}>
          <button onClick={updateCount}>{reloadCount === 0 ? 'Load' : 'Reload'}</button>
        </div>
  
        <div style={{marginTop: '2rem'}}>
          Use Async?
          <input type="checkbox" checked={useAsync} onChange={toggleAsyncSync} />
        </div>

        <div style={{marginTop: '2rem'}}>
          Use Worker?
          <input type="checkbox" checked={useWorker} onChange={toggleUseWorker} />
        </div>
      
      </header>
     
    </div>
  );
}

export default App;
