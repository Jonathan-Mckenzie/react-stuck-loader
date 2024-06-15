import React, { useState } from 'react';

const Clicker = () => {
  const [clickCount, setClickCount] = useState(0);

  const incrementClickCount = () => {
    setClickCount(clickCount + 1);
  };

  return (
    <div>
      <p>Click Count: {clickCount}</p>
      <button onClick={incrementClickCount}>Click Me</button>
    </div>
  );
};

export default Clicker;