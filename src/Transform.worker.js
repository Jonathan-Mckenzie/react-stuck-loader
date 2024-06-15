export default () => {
    self.addEventListener('message', e => { // eslint-disable-line no-restricted-globals
        if (!e) return;
        console.log('Received message from the main thread:', e.data);
        const { n } = e.data;
        let count = 0;
      
        for (let i = 0; i < n; i++) {
          count += Math.random();
        }
      
        // Post final result
        postMessage({ result: [] });
    })
  }