import React from "react";
import {
    addRecord,
    countDbRecords,
    deleteRecord,
    findrecordbyid,
    findrecordbyname,
    listAllRecordsById,
    listAllRecordsByName,
    resetAll,
    updateRecord
} from "./AppFunctions";
import "./ButtonsUI.css"
function ButtonsUI() {
    return(
        <div id="buttonsdiv">
            <input className="datasubmit" type="button" value="FIND BY ID"     onClick={findrecordbyid}/>
            <input className="datasubmit" type="button" value="FIND BY NAME"   onClick={findrecordbyname}/>
            <input className="datasubmit" type="button" value="UPDATE REC"     onClick={updateRecord}/>
            <input className="datasubmit" type="button" value="ADD REC"        onClick={addRecord}/>
            <input className="datasubmit" type="button" value="DEL REC"        onClick={deleteRecord}/>
            <input className="datasubmit" type="button" value="LIST BY ID"     onClick={listAllRecordsById}/>
            <input className="datasubmit" type="button" value="LIST BY NAME"   onClick={listAllRecordsByName}/>
            <input className="datasubmit" type="button" value="CLEAR FORM"     onClick={resetAll}/>
            <input className="datasubmit" type="button" value="GET COUNT"      onClick={countDbRecords}/>
        </div>
    )
} // BUTTONSUI()

export default ButtonsUI;