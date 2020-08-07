import React from "react";
import ReactDOM from 'react-dom';
import './TabsController.css';
import config from "react-global-configuration";
import CropsUI from "./CropsUI";
import VarietiesUI from "./VarietiesUI";

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
    let indx = 0;
    let targName = event.target.id;
    if(config.get('debugseedsux')) console.log("Setting active pane: " + targName);
    let dataForms = document.getElementsByClassName("dataform");
    for(indx = 0; indx < dataForms.length; indx++) {
        dataForms[indx].style.display = " none";
    } // FOR 1
    let tabItems = document.getElementsByClassName("tab-list-item");
    for(indx = 0; indx < dataForms.length; indx++) {
        tabItems[indx].className = tabItems[indx].className.replace(" active","");
    } // FOR 2
    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
    if(targName === "crops") ReactDOM.render(<CropsUI/>,document.getElementById("root"));
    else ReactDOM.render(<VarietiesUI/>,document.getElementById("root"));
} // SETACTIVEPANE()

export default TabsController;
