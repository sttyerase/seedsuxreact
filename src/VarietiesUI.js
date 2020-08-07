import React from 'react';
import {setDbTable} from './AppFunctions';
import './UIs.css';

function VarietiesUI() {
  return (
      <form className="dataform" id={"varietiesform"} onLoad={setDbTable("VARIETIES")}>
        <label className="datalabel" htmlFor="varietyid">Variety Id:</label><br/>
        <input id="varietyid" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="varietyname">Variety Name:</label><br/>
        <input id="varietyname" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="varietydescription">Variety Description:</label><br/>
        <input id="varietydescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropid">Crop Id:</label><br/>
        <input id="cropid" type="text" className="datatext"/><br/>
      </form>
  );
} // FUNCTION APP()

export default VarietiesUI;

