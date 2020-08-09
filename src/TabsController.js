import React from "react";
import ReactDOM from 'react-dom';
import './TabsController.css';
import config from "react-global-configuration";
import CropsUI from "./CropsUI";
import VarietiesUI from "./VarietiesUI";
import {loadparams, resetAll} from "./AppFunctions";

// TODO: ONCLICK FUNCTION CALL WITH () EXECUTES ON COMPONENT CREATE???? WTF
function TabsController() {
    return(
        <div className="tab-list">
            <input type={"button"} className={"tab-list-item"} value={"CROPS"}     id={"crops"}     onClick={setActivePane}/>
            <input type={"button"} className={"tab-list-item"} value={"VARIETIES"} id={"varieties"} onClick={setActivePane}/>
        </div>
    )
} // TABSCONTROLLER()

function setActivePane(event) {
    let targName = event.target.id;
    if(config.get('debugseedsux')) console.log("Setting active pane: " + targName);
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    if(targName === "crops") {
        ReactDOM.render(<CropsUI/>,document.getElementById("root"));
    }else if(targName === "varieties"){
        ReactDOM.render(<VarietiesUI/>,document.getElementById("root"));
    }
} // SETACTIVEPANE()

export default TabsController;
