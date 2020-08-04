import React from "react";
import './Tabs.css';

function TabsUI() {
    return(
        <div id={"tabsdiv"}>
            <input type={"button"} className={"tab-list"} value={"CROPS"}/>
            <input type={"button"} className={"tab-list"} value={"VARS"}/>
            <input type={"button"} className={"tab-list"} value={"PRODUCERS"}/>
        </div>
    );
}

export default TabsUI;

