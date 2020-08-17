import React from 'react';
import {initPane} from './AppFunctions';
import './UIs.css';

// DATA INPUT UIs WILL HAVE ONLY DATA INPUTS. SUBMIT BUTTONS GO IN BUTTONSUI PANEL.
function VarietiesUI() {
  return (
      <form className="dataform" id={"varietiesform"} onLoad={initPane("VARIETIES")}>
        <label className="datalabel" htmlFor="varietyId">Variety Id:</label><br/>
        <input id="varietyId" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="varietyName">Variety Name:</label><br/>
        <input id="varietyName" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="varietyDescription">Variety Description:</label><br/>
        <input id="varietyDescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="varietyCropId">Crop Id:</label><br/>
        <input id="varietyCropId" type="text" className="datanumber"/><br/>
      </form>
  );
} // FUNCTION APP()

export default VarietiesUI;

