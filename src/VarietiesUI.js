import React from 'react';
import {initPane,getCropsDropdownList} from './AppFunctions';
import './UIs.css';

// DATA INPUT UIs WILL HAVE ONLY DATA INPUTS. SUBMIT BUTTONS GO IN BUTTONSUI PANEL.
function VarietiesUI() {
    React.useEffect(() => {
        getCropsDropdownList();
    },[]);
  return (
      <form className="dataform" id={"varietiesform"} onLoad={initPane("VARIETIES")}>
        <label className="datalabel" htmlFor="varietyId">Variety Id:</label><br/>
        <input id="varietyId" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="varietyName">Variety Name:</label><br/>
        <input id="varietyName" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="varietyDescription">Variety Description:</label><br/>
        <input id="varietyDescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="varietyCropId">Crop:</label><br/>
        <select id="varietyCropId" className="datadropdown"></select><br/>
      </form>
  );
} // FUNCTION APP()

export default VarietiesUI;

