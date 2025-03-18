import React, { useState, useEffect } from 'react';

const excalidraxTry = () => {
  const [ExcalidrawComponent, setExcalidrawComponent] = useState(null);

  useEffect(() => {
    import('@excalidraw/excalidraw').then((module) => {
      setExcalidrawComponent(() => module.Excalidraw);
    });
  }, []);

  if (!ExcalidrawComponent) {
    return <div>Loading Excalidraw...</div>;
  }
  return (
    <div>
      <div style={{ height: '100vh' }}>
      <h1>Excalidraw Example</h1>
      <div style={{ height: '500px' }}>
        <ExcalidrawComponent />
      </div>
    </div>
      
    </div>
  )
}

export default excalidraxTry
