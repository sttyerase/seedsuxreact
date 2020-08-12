import React from 'react';
import {initPane} from './AppFunctions';
import './UIs.css';

// DATA INPUT UIs WILL HAVE ONLY DATA INPUTS. SUBMIT BUTTONS GO IN BUTTONSUI PANEL.
function VarietiesUI() {
  return (
      <form className="dataform" id={"varietiesform"} onLoad={initPane("VARIETIES")}>
        <label className="datalabel" htmlFor="varietyid">Variety Id:</label><br/>
        <input id="varietyid" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="varietyname">Variety Name:</label><br/>
        <input id="varietyname" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="varietydescription">Variety Description:</label><br/>
        <input id="varietydescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropid">Crop Id:</label><br/>
        <input id="cropid" type="text" className="datanumber"/><br/>
      </form>
  );
} // FUNCTION APP()

export default VarietiesUI;

