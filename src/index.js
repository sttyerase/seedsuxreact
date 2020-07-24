import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CropUI from "./App";
import config from 'react-global-configuration';

let debugux = process.env.DEBUGSEEDSUX;
config.set({debugseedsux: `${debugux}`, sysname: "Seeds UX"});

ReactDOM.render(
  <React.StrictMode>
    <CropUI />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(
    <React.StrictMode>
        <textarea id="resptext" className="resptext" disabled/>
    </React.StrictMode>,
    document.getElementById('respdiv')
);

