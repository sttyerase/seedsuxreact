import React from "react";
import './Tabs.css';

function TabsUI() {
    return(
        <div id={"tabsdiv"}>
            <input type={"button"} className={"tabbutton"} value={"CROPS"}/>
            <input type={"button"} className={"tabbutton"} value={"VARS"}/>
        </div>
    );
}

export default TabsUI;

