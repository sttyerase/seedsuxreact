import React from 'react';
import {initPane} from './AppFunctions';
import './UIs.css';

// DATA INPUT UIs WILL HAVE ONLY DATA INPUTS. SUBMIT BUTTONS GO IN BUTTONSUI PANEL.
function CropsUI() {
  return (
      <form className="dataform" id={"cropsform"} onLoad={initPane("CROPS")}>
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="cropId">Crop Id:</label>
        <input id="cropId" type="text" className="datanumber"/>
          </div>
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="cropName">Crop Name:</label>
        <input id="cropName" type="text" className="datatext"/>
          </div>
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="cropDescription">Crop Description:</label>
        <input id="cropDescription" type="datatext" className="datatext"/>
          </div>
          <div className={"labelinputpair"}>
        <label className="datalabel" htmlFor="cropICCCode">Crop ICC Code:</label>
        <input id="cropICCCode" type="number" className="datanumber"/>
          </div>
      </form>
  );
} // CROPSUI()

export default CropsUI;

