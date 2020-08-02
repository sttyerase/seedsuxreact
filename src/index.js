import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CropUI from "./App";
import RespUI from "./Resp";
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
        <RespUI/>
    </React.StrictMode>,
    document.getElementById('respdiv')
);

ReactDOM.render(
    <React.StrictMode>
        <div id="apptabs">
            <input type={"button"} className={"tabbutton"} value={"CROPS"}/>
            <input type={"button"} className={"tabbutton"} value={"VARS"}/>
        </div>
    </React.StrictMode>,
    document.getElementById('tabdiv')
);
