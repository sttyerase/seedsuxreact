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
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="varietyId">Variety Id:</label>
        <input id="varietyId" type="text" className="datanumber"/>
          </div>
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="varietyName">Variety Name:</label>
        <input id="varietyName" type="text" className="datatext"/>
          </div>
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="varietyDescription">Variety Description:</label>
        <input id="varietyDescription" type="datatext" className="datatext"/>
          </div>
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="varietyCropId">Crop:</label>
        <select id="varietyCropId" className="datadropdown"></select>
          </div>
      </form>
  );
} // FUNCTION APP()

export default VarietiesUI;

