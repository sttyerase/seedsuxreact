import React from 'react';
import {loadparams} from './AppFunctions';
import './UIs.css';

function CropsUI() {
  return (
      <form className="dataform" id={"cropsform"} onLoad={loadparams("CROPS")}>
        <label className="datalabel" htmlFor="cropid">Crop Id:</label><br/>
        <input id="cropid" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="cropname">Crop Name:</label><br/>
        <input id="cropname" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropdescription">Crop Description:</label><br/>
        <input id="cropdescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropicccode">Crop ICC Code:</label><br/>
        <input id="cropicccode" type="number" className="datanumber"/><br/>
      </form>
  );
} // CROPSUI()

export default CropsUI;

