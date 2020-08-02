import React from 'react';
import ReactDOM from 'react-dom';
import config from 'react-global-configuration';
import './index.css';
import CropUI from "./Crops";
import RespUI from "./Resp";
import TabsUI from "./Tabs";

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
        <TabsUI/>
    </React.StrictMode>,
    document.getElementById('tabsdiv')
);
