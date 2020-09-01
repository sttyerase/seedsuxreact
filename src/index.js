import React from 'react';
import ReactDOM from 'react-dom';
import config from 'react-global-configuration';
import './index.css';
import ResponseDisplay from "./ResponseDisplay";
import TabsController from "./TabsController";
import ButtonsUI from "./ButtonsUI";
import CropsUI from "./CropsUI";

let debugux = true, apiurl  = process.env.REACT_APP_APIURL;
// EXAMPLE OF HOW TO SET BOOLEAN IN REACT-GLOBAL-CONFIGURATION
if(process.env.REACT_APP_DEBUGSEEDSUX === "true") debugux = true; else debugux = false;
config.set( {debugseedsux : debugux,
    sysname : "Seed Inspection User Screens",
    apiurl : `${apiurl}`} );

console.log("CONFIGURATION:\n     APIURL: " + apiurl + "  || DEBUG: " + config.get("debugseedsux") + " : " + debugux);

ReactDOM.render(
    <React.StrictMode>
        <h3>{config.get('sysname')}</h3>
    </React.StrictMode>,
    document.getElementById('headdiv')
);

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

// TELL APPLICATION TO LOAD CROPSUI ON STARTUP
window.onload = function () {
    ReactDOM.render(
        <React.StrictMode>
            <CropsUI/>
        </React.StrictMode>,
        document.getElementById('root')
    );
} // DEFAULT CROPUI PANEL
