import React from 'react';
import ReactDOM from 'react-dom';
import config from 'react-global-configuration';
import './index.css';
import ResponseDisplay from "./ResponseDisplay";
// import TabsUI from "./Tabs";
import TabsController from "./TabsController";
import ButtonsUI from "./ButtonsUI";
import CropsUI from "./CropsUI";

let debugux = process.env.DEBUGSEEDSUX;
config.set({debugseedsux: `${debugux}`, sysname: "Seeds UX"});

ReactDOM.render(
    <React.StrictMode>
        <TabsController/>
    </React.StrictMode>,
    document.getElementById('tabsdiv')
);

ReactDOM.render(
    <React.StrictMode>
        <ButtonsUI/>
    </React.StrictMode>,
    document.getElementById('buttonsdiv')
);

ReactDOM.render(
    <React.StrictMode>
        <ResponseDisplay/>
    </React.StrictMode>,
    document.getElementById('respdiv')
);

window.onload = function () {
    ReactDOM.render(
        <React.StrictMode>
            <CropsUI/>
        </React.StrictMode>,
        document.getElementById('root')
    );
} // DEFAULT CROPUI PANEL