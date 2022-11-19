import React from 'react';
import ReactDOM from 'react-dom/client';
import DoSComparisonTool from './main';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DoSComparisonTool />
  </React.StrictMode>
);
