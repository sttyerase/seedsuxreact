import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CropUI from "./App";

ReactDOM.render(
  <React.StrictMode>
    <CropUI />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
    <React.StrictMode>
        <textarea id="resptext" className="resptext" disabled value="HELLO HELLO HELLO"/>
    </React.StrictMode>,
    document.getElementById('respdiv')
);

