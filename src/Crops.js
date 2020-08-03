import React from 'react';
import {
    findrecordbyid,
    updatedata,
    adddata,
    deletedata,
    listAllByName,
    listAll,
    resetAll,
    resetMessageBoard,
    resetFocus,
    resetForm,
    countDbRecords,
    setDbTable
} from './AppFunctions'
import './Crops.css';
import config from 'react-global-configuration';

setDbTable("CROPS");

function CropUI() {
  return (
      <form id="dataform">
        <label className="datalabel" htmlFor="cropid">Crop Id:</label><br/>
        <input id="cropid" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="cropname">Crop Name:</label><br/>
        <input id="cropname" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropdescription">Crop Description:</label><br/>
        <input id="cropdescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropicccode">Crop ICC Code:</label><br/>
        <input id="cropicccode" type="number" className="datanumber"/><br/>
        <div id="buttonsdiv">
          <input className="datasubmit" type="button" value="FIND BY ID"     onClick={findrecordbyid}/>
          <input className="datasubmit" type="button" value="UPDATE REC"     onClick={updatedata}/>
          <input className="datasubmit" type="button" value="ADD REC"        onClick={adddata}/>
          <input className="datasubmit" type="button" value="DEL REC"        onClick={deletedata}/>
          <input className="datasubmit" type="button" value="LIST BY ID"     onClick={listAll}/>
          <input className="datasubmit" type="button" value="LIST BY NAME"   onClick={listAllByName}/>
          <input className="datasubmit" type="button" value="CLEAR FORM"     onClick={resetAll}/>
          <input className="datasubmit" type="button" value="GET COUNT"      onClick={countDbRecords}/>
        </div>
      </form>
  );
} // FUNCTION APP()

export default CropUI;

