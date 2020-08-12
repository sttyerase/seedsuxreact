import React from "react";
import {
    adddata,
    countDbRecords,
    deletedata,
    findrecordbyid,
    listAllById,
    listAllByName,
    resetAll,
    updatedata
} from "./AppFunctions";
import "./ButtonsUI.css"
function ButtonsUI() {
    return(
        <div id="buttonsdiv">
            <input className="datasubmit" type="button" value="FIND BY ID"     onClick={findrecordbyid}/>
            <input className="datasubmit" type="button" value="UPDATE REC"     onClick={updatedata}/>
            <input className="datasubmit" type="button" value="ADD REC"        onClick={adddata}/>
            <input className="datasubmit" type="button" value="DEL REC"        onClick={deletedata}/>
            <input className="datasubmit" type="button" value="LIST BY ID"     onClick={listAllById}/>
            <input className="datasubmit" type="button" value="LIST BY NAME"   onClick={listAllByName}/>
            <input className="datasubmit" type="button" value="CLEAR FORM"     onClick={resetAll}/>
            <input className="datasubmit" type="button" value="GET COUNT"      onClick={countDbRecords}/>
        </div>
    )
} // BUTTONSUI()

export default ButtonsUI;