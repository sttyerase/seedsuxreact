import React from 'react';
import {initPane} from './AppFunctions';
import './UIs.css';

// DATA INPUT UIs WILL HAVE ONLY DATA INPUTS. SUBMIT BUTTONS GO IN BUTTONSUI PANEL.
function CropsUI() {
  return (
      <form className="dataform" id={"cropsform"} onLoad={initPane("CROPS")}>
        <label className="datalabel" htmlFor="cropId">Crop Id:</label><br/>
        <input id="cropId" type="text" className="datanumber"/><br/>
        <label className="datalabel" htmlFor="cropName">Crop Name:</label><br/>
        <input id="cropName" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropDescription">Crop Description:</label><br/>
        <input id="cropDescription" type="text" className="datatext"/><br/>
        <label className="datalabel" htmlFor="cropICCCode">Crop ICC Code:</label><br/>
        <input id="cropICCCode" type="number" className="datanumber"/><br/>
      </form>
  );
} // CROPSUI()

export default CropsUI;

